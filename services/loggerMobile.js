// logger.js
import RNFS from 'react-native-fs';


export const logState = async (state) => {
  try{
      // Create logs directory if it doesn't exist
      const logsDir = `${RNFS.DocumentDirectoryPath}/logs`;
      await RNFS.mkdir(logsDir);

      // Create or open the log file
      const logFilePath = `${logsDir}/log.txt`;
      await RNFS.appendFile(logFilePath, JSON.stringify(state, null, 2) + '\n', 'utf8');

      console.log('State appended to log file successfully.');
    
  } catch (error){
    console.error('Error appending state to log file:', error);
  }
};
  
  export const logLifecycleEvent = async (eventName, ...args) => {
    try{
      // Create logs directory if it doesn't exist
      const logsDir = `${RNFS.DocumentDirectoryPath}/logs`;
      await RNFS.mkdir(logsDir);

      // Create or open the log file
      const logFilePath = `${logsDir}/log.txt`;
      await RNFS.appendFile(logFilePath, `Lifecycle Event ${eventName}:` + '\n', 'utf8');

      console.log('State appended to log file successfully.');
    
    } catch (error){
      console.error('Error appending state to log file:', error);
    }
  };
  