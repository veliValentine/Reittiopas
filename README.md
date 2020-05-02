<h1>
    <a href="https://koodihaaste.solidabis.com/?utm_source=facebook&utm_medium=banner&utm_campaign=koodihaaste&fbclid=IwAR2mF2954_gj316eu1Y2dyiFKr31QwEylsvxfqLees7TZMo6_Z8EQGzR4cc">
        Koodihaaste 2020
    </a>
</h1>

<h2>Sovellus löytyy herokusta</h2>
<a href="https://reitinhaku.herokuapp.com/">Sovellukseen pääset tästä!</a>
<hr/>
<h3>Reittihaku-sovellus</h3>
<p>Sovellus on luotu käyttäen Reactin Create-React-App toimintoa</p>
<p>Muotoiluun käytettiin React-Bootstrap kirjaston 1.0.1 veriota</p>
<p>react versiota 16.13.1</p>
<p>npm versiota 6.14.4</p>

<h3>Käyttö</h3>
<p><a href="https://reitinhaku.herokuapp.com/">Menemällä tähän osoitteeseen</a></p>
<p>Tai</p>
<ul>
<li>Lataamalla npm version 6.14</li>
<li>Lataamalla ylläolevat tiedostot</li>
<li>Suorita komento "npm start" projektin juuressa</li>
</ul>
<hr/>
<h3>Ratkaisu</h3>
<p></p>
<p>Ratkaisu koostuu kahdesta pääkomponentista</p>
<ol>
<li>Reitin hakemisesta</li>
<li>Käytettävien bussilinjojen hakemisesta</li>
</ol>
<h5>Reitin haku</h5>
<p>Aluksi haetaan data taulukoihin data.json tiedostosta</p>
<p>Pysäkkien väliset reitit filtteröidään sen mukaan onko niiden välillä toimiva bussilinjasto</p>
<p>Reitin haku toimii käyttäen Dijkstra-algoritmin toimintaperiaatetta</p>
<p>Reitin hakeminen aloitetaan reitin lähtöpaikasta ja päätetään kun reitti määränpäähän on löytynyt.</p>
<p>Pysäkin kohdalla päivitetään sille lyhin aika lähtöpysäkiltä</p>
<p>Lopuksi palautetaan lyhin reitti, reittiin mennyt aika ja alkupisteestä kaikkiin pysäkkeihin kulunut aika</p>

<h5>Linjojen haku</h5>
<p>Käydään kuljettua reittiä pysäkkiväli kerrallaan.</p>
<p>Kaikki käyvät bussilinjat lisätään listaan vain, jos linja kulkee kyseisiä pysäkkejä pitkin ja pysäkit ovat vierekkäin.</p>

<h5>Muu toiminnallisuus</h5>
<p>Sovelluksen käyttö on jaettu kahteen komponenttiin.</p>
<p>Haku-lomakkeeseen ja tietojen näyttämiseen</p>
<p>Lomake kysyy käyttäjältä lähtö- ja määränpääpysäkkiä. Tämän jälkeen reitti haetaan käyttäen reitinhaku- toiminnallisuutta</p>
<br/>
<p>Löydetylle reitille etsitään käytetyt bussilinjat ja tulokset taulukoidaan käyttäjän nähtäväksi</p>

<p></p>
