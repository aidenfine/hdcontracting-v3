import SyncLoader from 'react-spinners/SyncLoader';
import { box } from './style';

export default function Loading() {
  return (
    <div style={box}>
      <SyncLoader />
    </div>
  );
}
