import logo from '../assets/PhotoFlipLogo.png';

const HeaderTopSpace = () => {

    return(
        <header>
            <div className="ontainer flex-row justify-center align-center">
                <div>
                    <img src={logo} alt="Photo Flip logo" height={60} />
                    <h1>Search for a Photo!</h1>
                </div>
                <p>The place of editing and discussion</p>
            </div>
        </header>
    )


}

export default HeaderTopSpace;