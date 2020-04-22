import { createContext } from 'react';

const CommandContext = createContext({commandID:0, command:'', commandData:null});

export default CommandContext;