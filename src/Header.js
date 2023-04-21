import { Link } from 'react-router-dom'
import ethLogo from './assets/eth.png'
import gasLogo from './assets/gas.png'

export default function Header({ gasPrice }) {
    return (
        <>
            <div className="header">
                <Link to="/">
                    <label>
                        &nbsp; <img src={ethLogo} alt='Eth Logo' /> Ethereum Blockchain Explorer
                    </label>
                </Link>
                <div className='info-container'>
                    <label>
                        <img src={gasLogo} alt='Gas' /> {gasPrice} Gwei &nbsp;
                    </label>
                </div>
            </div>
        </>
    )
}



