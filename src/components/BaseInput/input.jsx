import { Input } from 'antd';
const InputBase = ({ setSearchQuery }) => (
  <Input onChange={(e)=>setSearchQuery(e.target.value)} placeholder='Basic usage' />
);
export default InputBase;
