function Footer(){
    return(
        <footer className="flex min-w-full py-11 justify-around gap-5 items-center text-footer border-t border-ink-3">
            <section className="hidden md:flex flex-col">
                <h2 className="font-sans text-title-3">EcoBite</h2>
                <ul>
                    <li><a href="" className="text-footer font-sans">© 2010 - 2014</a></li>
                    <li><a href="" className="text-footer font-sans">Privacy - Terms</a></li>
                </ul>
            </section>
            <section className="hidden md:flex gap-12">
                <div>
                    <h2 className="font-sans text-label">Product</h2>
                    <ul>
                        <li><a href="" className="text-footer font-sans">product</a></li>
                        <li><a href="" className="text-footer font-sans">product</a></li>
                        <li><a href="" className="text-footer font-sans">product</a></li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-sans">Product</h2>
                    <ul>
                        <li><a href="" className="text-footer font-sans">product</a></li>
                        <li><a href="" className="text-footer font-sans">product</a></li>
                        <li><a href="" className="text-footer font-sans">product</a></li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-sans text-label">Product</h2>
                    <ul>
                        <li><a href="" className="text-footer font-sans">product</a></li>
                        <li><a href="" className="text-footer font-sans">product</a></li>
                        <li><a href="" className="text-footer font-sans">product</a></li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-sans text-label">Product</h2>
                    <ul>
                        <li><a href="" className="text-footer font-sans">product</a></li>
                        <li><a href="" className="text-footer font-sans">product</a></li>
                        <li><a href="" className="text-footer font-sans">product</a></li>
                    </ul>
                </div>
            </section>

            {/* footer mobile */}
            <section className="max-md:flex flex-col gap-2 hidden items-center">
                <div className="flex gap-1 text-label text-ink-3">
                    <a href="">EcoBite</a> <p>·</p>
                    <a href="">Portal Restaurante</a><p>·</p>
                    <a href="">Ayuda</a>
                </div>
                <p className="text-ink-3">© 2026 · s2604</p>
            </section>
        </footer>
    );
}

export default Footer;