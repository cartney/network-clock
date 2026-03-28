/**
 * 时间同步工具
 * 从 NTP 服务器获取准确时间并校准本地时钟
 */

interface TimeOffset {
  offset: number;
  lastSync: number;
}

let timeOffset: TimeOffset | null = null;

/**
 * 从 NTP 服务器获取时间偏移量
 * 使用多个 NTP 池服务器提高可靠性
 */
export const syncTime = async (): Promise<number> => {
  const ntpServers = [
    'https://timeapi.io/api/Time/current/zone?timeZone=UTC',
    'https://worldtimeapi.org/api/ip',
  ];

  for (const server of ntpServers) {
    try {
      const startTime = Date.now();
      const response = await fetch(server, { 
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      });
      
      if (!response.ok) continue;
      
      const data = await response.json();
      const endTime = Date.now();
      
      // 解析服务器时间
      let serverTime: number;
      if (data.datetime) {
        serverTime = new Date(data.datetime).getTime();
      } else if (data.utc_datetime) {
        serverTime = new Date(data.utc_datetime).getTime();
      } else {
        continue;
      }
      
      // 计算网络延迟和时间偏移
      const networkDelay = (endTime - startTime) / 2;
      const estimatedServerTime = startTime + networkDelay;
      const offset = serverTime - estimatedServerTime;
      
      timeOffset = {
        offset,
        lastSync: Date.now(),
      };
      
      console.log(`时间同步成功，偏移量：${offset}ms`);
      return offset;
    } catch (error) {
      console.warn(`NTP 服务器 ${server} 同步失败:`, error);
      continue;
    }
  }
  
  throw new Error('所有 NTP 服务器同步失败');
};

/**
 * 获取同步后的时间
 * 如果已同步，返回校准后的时间；否则返回本地时间
 */
export const getSyncedTime = (): Date => {
  if (!timeOffset) {
    return new Date();
  }
  
  const elapsed = Date.now() - timeOffset.lastSync;
  return new Date(Date.now() + timeOffset.offset + elapsed);
};

/**
 * 检查是否需要重新同步（超过 1 小时未同步）
 */
export const needsSync = (): boolean => {
  if (!timeOffset) return true;
  const oneHour = 60 * 60 * 1000;
  return Date.now() - timeOffset.lastSync > oneHour;
};

/**
 * 获取上次同步时间
 */
export const getLastSyncTime = (): Date | null => {
  return timeOffset ? new Date(timeOffset.lastSync) : null;
};
