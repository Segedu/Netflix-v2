import './Spinner.module.css';
import { Oval } from 'react-loader-spinner';

const Spinner = () => {
    return (<section className='body'>
        <Oval color="#b40606" height={80} width={80} />
    </section >)
}

export default Spinner;