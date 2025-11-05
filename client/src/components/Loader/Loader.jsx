import { BounceLoader } from 'react-spinners';
import { loader } from './loader.module.scss';

export default function Loader() {
  return (
    <div className={loader}>
      <BounceLoader color="#0F71D7" size={80} />
    </div>
  );
}
