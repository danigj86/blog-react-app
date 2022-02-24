import React from 'react'



export const Footer = () => {
    return (
        <div class="footer-dark">
            <footer>
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6 col-md-3 item">
                            <h3>Enlaces</h3>
                            <ul>
                                <li><a href="#">Aviso legal</a></li>
                                <li><a href="#">Aviso de cookies</a></li>
                                <li><a href="#">Política de privacidad</a></li>
                            </ul>
                        </div>
                        <div class="col-sm-6 col-md-3 item">
                            <h3>Acerca de</h3>
                            <ul>
                                <li><a href="#">Este blog</a></li>
                                <li><a href="#">El autor</a></li>
                                <li><a href="#">Funcionalidades</a></li>
                            </ul>
                        </div>
                        <div class="col-md-6 item text">
                            <h3>DanielDev</h3>
                            <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>
                        </div>
                    </div>
                    <p class="copyright">DanielDev © 2022</p>
                </div>
            </footer>
        </div>
    )
}
