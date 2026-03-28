import { useState, useEffect } from 'react';
import { Clock } from './components/Clock';
import { DateDisplay } from './components/DateDisplay';
import { syncTime, needsSync, getLastSyncTime } from './utils/timeSync';
import './App.css';

function App() {
  const [fontSize, setFontSize] = useState(120);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // 初始时间同步
  useEffect(() => {
    const performSync = async () => {
      if (needsSync()) {
        setIsSyncing(true);
        try {
          await syncTime();
          setLastSync(getLastSyncTime());
        } catch (error) {
          console.error('时间同步失败:', error);
        } finally {
          setIsSyncing(false);
        }
      }
    };

    performSync();
    
    // 每小时自动同步一次
    const interval = setInterval(performSync, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // 全屏模式切换
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error('全屏模式失败:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // 字体大小调节
  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 20, 300));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 20, 40));

  return (
    <div className="app">
      <div className="clock-container">
        <Clock fontSize={fontSize} />
        <DateDisplay fontSize={Math.max(fontSize / 3, 24)} />
      </div>

      <div className="controls">
        <button onClick={decreaseFontSize} title="缩小字体">
          <span>A-</span>
        </button>
        <button onClick={toggleFullscreen} title={isFullscreen ? '退出全屏' : '全屏模式'}>
          <span>{isFullscreen ? '⛶' : '⛶'}</span>
        </button>
        <button onClick={increaseFontSize} title="放大字体">
          <span>A+</span>
        </button>
      </div>

      <div className="status-bar">
        {isSyncing && <span className="syncing">同步中...</span>}
        {lastSync && !isSyncing && (
          <span className="synced">
            已同步：{lastSync.toLocaleTimeString('zh-CN')}
          </span>
        )}
        {!lastSync && !isSyncing && (
          <span className="local">本地时间</span>
        )}
      </div>
    </div>
  );
}

export default App;
