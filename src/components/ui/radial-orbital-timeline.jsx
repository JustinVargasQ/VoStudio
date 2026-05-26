import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Link, Zap } from 'lucide-react';
import { Badge } from './badge';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';

export default function RadialOrbitalTimeline({ timelineData }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [activeNodeId, setActiveNodeId] = useState(null);
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) newState[parseInt(key)] = false;
      });
      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedItems = getRelatedItems(id);
        const newPulseEffect = {};
        relatedItems.forEach((relId) => { newPulseEffect[relId] = true; });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer;
    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
      }, 50);
    }
    return () => { if (rotationTimer) clearInterval(rotationTimer); };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 170;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId) => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'completed':   return 'text-white bg-black border-white';
      case 'in-progress': return 'text-black bg-white border-black';
      case 'pending':     return 'text-white bg-black/40 border-white/50';
      default:            return 'text-white bg-black/40 border-white/50';
    }
  };

  return (
    <div
      className="w-full flex items-center justify-center overflow-hidden"
      style={{ height: 560, background: 'transparent' }}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-2xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: '1000px' }}
        >
          {/* Center orb */}
          <div className="absolute w-14 h-14 rounded-full flex items-center justify-center z-10"
            style={{ background: 'linear-gradient(135deg, #E03877, #E03877, #FF8AB8)', animation: 'pulse 2s ease-in-out infinite' }}>
            <div className="absolute w-18 h-18 rounded-full border border-white/20" style={{ width: 72, height: 72, animation: 'ping 1s ease-in-out infinite', opacity: 0.7 }} />
            <div className="absolute rounded-full border border-white/10" style={{ width: 88, height: 88, animation: 'ping 1s ease-in-out infinite', animationDelay: '0.5s', opacity: 0.5 }} />
            <div className="w-7 h-7 rounded-full bg-white/80 backdrop-blur" />
          </div>

          {/* Orbit ring */}
          <div className="absolute rounded-full border border-white/10" style={{ width: 340, height: 340 }} />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
              >
                {/* Energy glow */}
                <div
                  className={isPulsing ? 'animate-pulse' : ''}
                  style={{
                    position: 'absolute',
                    background: 'radial-gradient(circle, rgba(224,56,119,0.3) 0%, rgba(224,56,119,0) 70%)',
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    borderRadius: '50%',
                  }}
                />

                {/* Node circle */}
                <div className={[
                  'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                  isExpanded  ? 'bg-white text-black border-white shadow-lg scale-150' : '',
                  isRelated   ? 'bg-white/50 text-black border-white animate-pulse' : '',
                  !isExpanded && !isRelated ? 'bg-black/80 text-white border-white/40' : '',
                ].join(' ')}
                  style={{ transform: isExpanded ? 'scale(1.5)' : 'scale(1)' }}
                >
                  <Icon size={16} />
                </div>

                {/* Label */}
                <div className={[
                  'absolute whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300',
                  isExpanded ? 'text-white' : 'text-white/70',
                ].join(' ')}
                  style={{ top: 44, left: '50%', transform: 'translateX(-50%)' }}
                >
                  {item.title}
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <Card className="absolute w-60 bg-black/90 backdrop-blur-lg border-white/30 shadow-xl overflow-visible"
                    style={{ top: 72, left: '50%', transform: 'translateX(-50%)' }}>
                    <div className="absolute h-3 w-px bg-white/50" style={{ top: -12, left: '50%', transform: 'translateX(-50%)' }} />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className={`px-2 text-xs ${getStatusStyles(item.status)}`}>
                          {item.status === 'completed' ? 'LISTO' : item.status === 'in-progress' ? 'EN CURSO' : 'PENDIENTE'}
                        </Badge>
                        <span className="text-xs font-mono text-white/50">{item.date}</span>
                      </div>
                      <CardTitle className="text-sm mt-2">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/80">
                      <p>{item.content}</p>

                      <div className="mt-4 pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center gap-1">
                            <Zap size={10} /> {item.energyLabel || 'Prioridad'}
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full" style={{ width: `${item.energy}%`, background: 'linear-gradient(to right, #E03877, #E03877)' }} />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2 gap-1">
                            <Link size={10} className="text-white/70" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-white/70">
                              {item.connectedLabel || 'Conectado con'}
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="h-6 px-2 py-0 text-xs rounded-none border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white"
                                  onClick={(e) => { e.stopPropagation(); toggleItem(relatedId); }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={8} className="ml-1 text-white/60" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
