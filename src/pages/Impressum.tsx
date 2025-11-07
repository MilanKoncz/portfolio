import { Helmet } from 'react-helmet';
import { siteMeta, contact } from '../config/site';

export default function Impressum() {
    return (
        <>
            <Helmet>
                <title>Impressum | {siteMeta.title.split(' - ')[0]}</title>
                <meta name="robots" content="noindex,follow" />
                <link rel="canonical" href={`${siteMeta.baseUrl}/impressum`} />
            </Helmet>

            <div className="container mx-auto px-4 py-16 prose prose-neutral dark:prose-invert max-w-3xl">
                <h1>Impressum</h1>

                <h2>Angaben gemäß § 5 TMG</h2>
                <p>
                    <strong>Milan Koncz</strong><br />
                    Hafenstraße 35<br />
                    68159 Mannheim<br />
                    Deutschland
                </p>
                <p>
                    E-Mail: <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>

                {/* ANPASSEN: Falls sich Rechtsform oder zusätzliche Angaben (USt-IdNr.) ändern, hier ergänzen. */}

                <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                <p>
                    Milan Koncz, Anschrift wie oben.
                </p>

                <h2>Haftung für Inhalte</h2>
                <p>
                    Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
                    allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht
                    verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
                    forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
                    Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche
                    Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
                    Bekanntwerden von entsprechenden Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.
                </p>

                <h2>Haftung für Links</h2>
                <p>
                    Mein Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb
                    kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist
                    stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum
                    Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
                    Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
                    konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werde
                    ich derartige Links umgehend entfernen.
                </p>

                <h2>Urheberrecht</h2>
                <p>
                    Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                    Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen
                    des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und
                    Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf
                    dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet.
                </p>
            </div>
        </>
    );
}
