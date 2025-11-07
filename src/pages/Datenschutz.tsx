import { Helmet } from 'react-helmet';
import { siteMeta, contact, analytics, captcha } from '../config/site';

export default function Datenschutz() {
    return (
        <>
            <Helmet>
                <title>Datenschutzerklärung | {siteMeta.title.split(' - ')[0]}</title>
                <meta name="robots" content="noindex,follow" />
                <link rel="canonical" href={`${siteMeta.baseUrl}/datenschutz`} />
            </Helmet>

            <div className="container mx-auto px-4 py-16 prose prose-neutral dark:prose-invert max-w-3xl">
                <h1>Datenschutzerklärung</h1>

                <p>
                    Diese Datenschutzerklärung informiert Sie über Art, Umfang und Zwecke der Verarbeitung personenbezogener Daten
                    innerhalb dieses Onlineangebotes und der mit ihm verbundenen Webseiten, Funktionen und Inhalte (nachfolgend
                    gemeinsam bezeichnet als „Website“).
                </p>

                <h2>Verantwortlicher</h2>
                <p>
                    <strong>Milan Koncz</strong><br />
                    Hafenstraße 35<br />
                    68159 Mannheim, Deutschland<br />
                    E-Mail: <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>

                {/* ANPASSEN: Falls sich Kontaktangaben ändern, hier aktualisieren. */}

                <h2>Arten der verarbeiteten Daten / Kategorien betroffener Personen</h2>
                <ul>
                    <li>Bestands- und Kontaktdaten (z. B. Name, E-Mail-Adresse bei Kontaktanfragen)</li>
                    <li>Nutzungsdaten (z. B. Zugriffszeiten, aufgerufene Seiten – serverseitig in Logfiles des Hosters)</li>
                    <li>Meta-/Kommunikationsdaten (z. B. IP-Adresse, Browsertyp, Betriebssystem)</li>
                </ul>

                <h2>Zwecke der Verarbeitung</h2>
                <ul>
                    <li>Zurverfügungstellung der Website, ihrer Funktionen und Inhalte</li>
                    <li>Beantwortung von Kontaktanfragen und Kommunikation mit Nutzern</li>
                    <li>Sicherheitsmaßnahmen (z. B. Server-Logs)</li>
                </ul>

                <h2>Rechtsgrundlagen</h2>
                <p>
                    Sofern in dieser Datenschutzerklärung die Rechtsgrundlage nicht konkret genannt wird, gilt Folgendes: Die
                    Rechtsgrundlage für die Verarbeitung zur Erfüllung meiner Leistungen und Durchführung vertraglicher Maßnahmen
                    sowie Beantwortung von Anfragen ist Art. 6 Abs. 1 lit. b DSGVO. Die Rechtsgrundlage für die Verarbeitung zur
                    Wahrung meiner berechtigten Interessen ist Art. 6 Abs. 1 lit. f DSGVO. Soweit ich eine Einwilligung des
                    Nutzers einhole, ist Rechtsgrundlage Art. 6 Abs. 1 lit. a DSGVO.
                </p>

                <h2>Hosting</h2>
                <p>
                    Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA gehostet. Beim Aufruf der
                    Website erhebt Vercel serverseitig Protokolldaten (z. B. IP-Adresse, User-Agent, Referrer, Zugriffszeiten), um
                    den Betrieb und die Sicherheit der Dienste zu gewährleisten. Weitere Informationen finden Sie in der
                    Datenschutzerklärung von Vercel: <a href="https://vercel.com/legal/privacy" target="_blank" rel="noreferrer">https://vercel.com/legal/privacy</a>.
                </p>

                <h2>Kontaktformular / E-Mail-Kontakt</h2>
                <p>
                    Bei einer Kontaktaufnahme per Formular oder E-Mail werden die Angaben des Nutzers verarbeitet, um die Anfrage
                    zu beantworten (Art. 6 Abs. 1 lit. b DSGVO). Die Daten werden nicht in einer separaten Datenbank gespeichert,
                    sondern ausschließlich per E-Mail an mich übermittelt. Eine weitergehende Speicherung erfolgt nur in meinem
                    E-Mail-Postfach und wird regelmäßig überprüft und gelöscht, sobald die Anfrage erledigt ist und keine
                    gesetzlichen Aufbewahrungspflichten entgegenstehen.
                </p>
                <p>
                    {/* ANPASSUNG: Konkreter SMTP-Dienst */}
                    Der Versand erfolgt aktuell über die SMTP-Server von <strong>Google (Gmail)</strong>, bereitgestellt durch Google
                    Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Die Übertragung der Nachricht erfolgt verschlüsselt
                    (TLS). Ihre Angaben (Name, E-Mail-Adresse, Nachricht) werden ausschließlich zur Beantwortung Ihrer Anfrage verwendet.
                    Bitte senden Sie keine besonders sensiblen Daten über das Formular.
                </p>
                <p>
                    Es wird ein unsichtbares "Honeypot"-Feld eingesetzt, um automatisierte Spam-Einsendungen zu erschweren. Dieses Feld
                    ist für reguläre Nutzer nicht sichtbar; falls es ausgefüllt wird, wird die Anfrage verworfen. {/* Technische Umsetzung in Contact.tsx */}
                </p>
                {captcha.provider === 'turnstile' && captcha.siteKey ? (
                    <p>
                        Zusätzlich wird zum Schutz vor automatisiertem Missbrauch der Captcha-Dienst <strong>Cloudflare Turnstile</strong> der
                        Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, USA eingesetzt. Dabei können technisch notwendige Daten
                        (IP-Adresse, User-Agent, Referrer) an Cloudflare übermittelt werden, um zu prüfen, ob eine echte Nutzung vorliegt. Die
                        Verarbeitung erfolgt auf Grundlage berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO: Schutz vor Missbrauch). Weitere
                        Informationen: <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">Cloudflare Privacy Policy</a>.
                    </p>
                ) : (
                    <p>
                        Aktuell wird kein Captcha-Dienst eingesetzt, außer einem rein technischen Spam-Schutz (Honeypot-Feld).
                    </p>
                )}
                <p>
                    <strong>Aufbewahrung / Löschung:</strong> Eingehende Nachrichten werden nach abschließender Bearbeitung regelmäßig geprüft
                    und gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten oder Anhaltspunkte für eine spätere Nachverfolgung bestehen.
                </p>

                <h2>Einsatz von Google Fonts</h2>
                <p>
                    Auf dieser Website werden Schriftarten („Google Fonts“) des Anbieters Google Ireland Limited, Gordon House,
                    Barrow Street, Dublin 4, Irland, eingebunden. Beim Abruf der Fonts von den Google-Servern wird Ihre IP-Adresse
                    an Google übermittelt, damit die Schrift im Browser dargestellt werden kann. Dies stellt ein berechtigtes
                    Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar (optimierte Darstellung, geringere Ladezeiten). Weitere
                    Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">https://policies.google.com/privacy</a>.
                </p>

                <h2>Cookies und lokale Speicherung</h2>
                <p>
                    Es werden keine nicht notwendigen Cookies gesetzt. Technisch notwendige Speichervorgänge (z. B. lokale
                    Speicherung durch den Browser oder PWA-Caches) können zur Bereitstellung der Website erforderlich sein und
                    bedürfen keiner Einwilligung.
                </p>

                <h2>Reichweitenmessung / Analytics</h2>
                <p>
                    {analytics.enabled ? (
                        <>Es kann eine datenschutzfreundliche Reichweitenmessung (z. B. Plausible) eingesetzt werden. Dabei werden keine
                            Cookies gesetzt und es findet keine Erstellung personenbezogener Nutzungsprofile statt. Die Verarbeitung
                            erfolgt auf Grundlage berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO). Details siehe Anbieter-Datenschutz.</>
                    ) : (
                        <>Es wird derzeit kein Analytics-Dienst eingesetzt.</>
                    )}
                </p>

                <h2>Externe Links und Online-Präsenzen</h2>
                <p>
                    Diese Website kann Links zu externen Seiten sowie Online-Auftritten (z. B. GitHub, LinkedIn, Instagram)
                    enthalten. Für die Inhalte externer Seiten sind ausschließlich deren Betreiber verantwortlich.
                </p>

                <h2>Rechte der betroffenen Personen</h2>
                <ul>
                    <li>Auskunft (Art. 15 DSGVO)</li>
                    <li>Berichtigung (Art. 16 DSGVO)</li>
                    <li>Löschung (Art. 17 DSGVO)</li>
                    <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                    <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                    <li>Widerspruch gegen Verarbeitungen (Art. 21 DSGVO)</li>
                    <li>Beschwerde bei einer Aufsichtsbehörde</li>
                </ul>

                <h2>Löschung von Daten</h2>
                <p>
                    Sofern in dieser Datenschutzerklärung nicht anders angegeben, werden Daten gelöscht, sobald sie für ihre
                    Zweckbestimmung nicht mehr erforderlich sind und der Löschung keine gesetzlichen Aufbewahrungspflichten
                    entgegenstehen.
                </p>

                <h2>Änderungen dieser Datenschutzerklärung</h2>
                <p>
                    Ich behalte mir vor, diese Datenschutzerklärung bei Änderungen der Rechtslage oder des Angebots anzupassen.
                </p>

                {/* ANPASSEN: Prüfe nach größeren Funktionsänderungen (z. B. neue Tools, Cookies) die Inhalte und passe sie an. */}
            </div>
        </>
    );
}
