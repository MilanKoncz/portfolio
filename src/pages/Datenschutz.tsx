import { Helmet } from 'react-helmet';
import { siteMeta, contact, analytics, captcha } from '../config/site';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="bg-white/70 dark:bg-gray-800/70 backdrop-blur rounded-xl shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 p-6 mb-10 transition-colors">
            <h2 className="text-xl font-semibold mb-4 tracking-tight text-gray-900 dark:text-gray-100">{title}</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                {children}
            </div>
        </section>
    );
}

export default function Datenschutz() {
    return (
        <>
            <Helmet>
                <title>Datenschutzerklärung | {siteMeta.title.split(' - ')[0]}</title>
                <meta name="robots" content="noindex,follow" />
                <link rel="canonical" href={`${siteMeta.baseUrl}/datenschutz`} />
            </Helmet>

            <div className="container mx-auto px-4 py-16 max-w-3xl">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Datenschutzerklärung</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-prose">Informationen über Art, Umfang und Zwecke der Verarbeitung personenbezogener Daten auf dieser Website.</p>
                </header>

                <Section title="Verantwortlicher">
                    <p className="m-0"><strong>Milan Koncz</strong></p>
                    <p className="m-0">Hafenstraße 35</p>
                    <p className="m-0">68159 Mannheim, Deutschland</p>
                    <p className="m-0">E-Mail: <a href={`mailto:${contact.email}`} className="text-blue-600 dark:text-blue-400 underline underline-offset-2">{contact.email}</a></p>
                    <p className="text-sm italic text-gray-500 dark:text-gray-400">(Bitte bei Änderungen der Kontaktangaben hier aktualisieren.)</p>
                </Section>

                <Section title="Arten der verarbeiteten Daten / Kategorien betroffener Personen">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Bestands- und Kontaktdaten (z. B. Name, E-Mail-Adresse bei Kontaktanfragen)</li>
                        <li>Nutzungsdaten (z. B. Zugriffszeiten, aufgerufene Seiten – serverseitig in Logfiles des Hosters)</li>
                        <li>Meta-/Kommunikationsdaten (z. B. IP-Adresse, Browsertyp, Betriebssystem)</li>
                    </ul>
                </Section>

                <Section title="Zwecke der Verarbeitung">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Zurverfügungstellung der Website, ihrer Funktionen und Inhalte</li>
                        <li>Beantwortung von Kontaktanfragen und Kommunikation mit Nutzern</li>
                        <li>Sicherheitsmaßnahmen (z. B. Server-Logs)</li>
                    </ul>
                </Section>

                <Section title="Rechtsgrundlagen">
                    <p>Sofern in dieser Datenschutzerklärung die Rechtsgrundlage nicht konkret genannt wird, gilt Folgendes:</p>
                    <p>Die Rechtsgrundlage für die Verarbeitung zur Erfüllung meiner Leistungen und Durchführung vertraglicher Maßnahmen sowie Beantwortung von Anfragen ist Art. 6 Abs. 1 lit. b DSGVO.</p>
                    <p>Die Rechtsgrundlage für die Verarbeitung zur Wahrung meiner berechtigten Interessen ist Art. 6 Abs. 1 lit. f DSGVO. Soweit eine Einwilligung eingeholt wird, ist Rechtsgrundlage Art. 6 Abs. 1 lit. a DSGVO.</p>
                </Section>

                <Section title="Hosting">
                    <p>Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA gehostet.</p>
                    <p>Beim Aufruf der Website erhebt Vercel serverseitig Protokolldaten (z. B. IP-Adresse, User-Agent, Referrer, Zugriffszeiten), um den Betrieb und die Sicherheit der Dienste zu gewährleisten.</p>
                    <p>Weitere Informationen: <a href="https://vercel.com/legal/privacy" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 underline underline-offset-2">https://vercel.com/legal/privacy</a>.</p>
                </Section>

                <Section title="Kontaktformular / E-Mail-Kontakt">
                    <p>Bei einer Kontaktaufnahme per Formular oder E-Mail werden die Angaben des Nutzers verarbeitet, um die Anfrage zu beantworten (Art. 6 Abs. 1 lit. b DSGVO).</p>
                    <p>Die Daten werden nicht in einer separaten Datenbank gespeichert, sondern ausschließlich per E-Mail an mich übermittelt. Eine weitergehende Speicherung erfolgt nur in meinem E-Mail-Postfach und wird regelmäßig überprüft und gelöscht, sobald die Anfrage erledigt ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
                    <p>Der Versand erfolgt aktuell über die SMTP-Server von <strong>Google (Gmail)</strong>, bereitgestellt durch Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Die Übertragung der Nachricht erfolgt verschlüsselt (TLS). Bitte keine besonders sensiblen Daten über das Formular senden.</p>
                    <p>Es wird ein unsichtbares "Honeypot"-Feld eingesetzt, um automatisierte Spam-Einsendungen zu erschweren. Wird dieses Feld gefüllt, wird die Anfrage verworfen.</p>
                    {captcha.provider === 'turnstile' && captcha.siteKey ? (
                        <p>Zusätzlich wird zum Schutz vor automatisiertem Missbrauch der Captcha-Dienst <strong>Cloudflare Turnstile</strong> (Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, USA) eingesetzt. Es werden technisch notwendige Daten (z. B. IP-Adresse, User-Agent, Referrer) an Cloudflare übermittelt, um eine echte Nutzung zu prüfen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse: Schutz vor Missbrauch). Mehr Infos: <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 underline underline-offset-2">Cloudflare Privacy Policy</a>.</p>
                    ) : (
                        <p>Aktuell wird kein Captcha-Dienst eingesetzt, außer einem rein technischen Spam-Schutz (Honeypot-Feld).</p>
                    )}
                    <p><strong>Aufbewahrung / Löschung:</strong> Eingehende Nachrichten werden nach Bearbeitung regelmäßig geprüft und gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten oder Anhaltspunkte für eine spätere Nachverfolgung bestehen.</p>
                </Section>

                <Section title="Einsatz von Google Fonts">
                    <p>Auf dieser Website werden Schriftarten („Google Fonts“) des Anbieters Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland, eingebunden.</p>
                    <p>Beim Abruf der Fonts von den Google-Servern wird Ihre IP-Adresse an Google übermittelt, damit die Schrift im Browser dargestellt werden kann. Dies stellt ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO dar (optimierte Darstellung, geringere Ladezeiten).</p>
                    <p>Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 underline underline-offset-2">https://policies.google.com/privacy</a>.</p>
                </Section>

                <Section title="Cookies und lokale Speicherung">
                    <p>Es werden keine nicht notwendigen Cookies gesetzt. Technisch notwendige Speichervorgänge (z. B. lokale Speicherung durch den Browser oder PWA-Caches) können zur Bereitstellung der Website erforderlich sein und bedürfen keiner Einwilligung.</p>
                </Section>

                <Section title="Reichweitenmessung / Analytics">
                    <p>
                        {analytics.enabled ? (
                            <>Es kann eine datenschutzfreundliche Reichweitenmessung (z. B. Plausible) eingesetzt werden. Dabei werden keine Cookies gesetzt und es findet keine Erstellung personenbezogener Nutzungsprofile statt. Die Verarbeitung erfolgt auf Grundlage berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO). Details siehe Anbieter-Datenschutz.</>
                        ) : (
                            <>Es wird derzeit kein Analytics-Dienst eingesetzt.</>
                        )}
                    </p>
                </Section>

                <Section title="Externe Links und Online-Präsenzen">
                    <p>Diese Website kann Links zu externen Seiten sowie Online-Auftritten (z. B. GitHub, LinkedIn, Instagram) enthalten. Für die Inhalte externer Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
                </Section>

                <Section title="Rechte der betroffenen Personen">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Auskunft (Art. 15 DSGVO)</li>
                        <li>Berichtigung (Art. 16 DSGVO)</li>
                        <li>Löschung (Art. 17 DSGVO)</li>
                        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                        <li>Widerspruch gegen Verarbeitungen (Art. 21 DSGVO)</li>
                        <li>Beschwerde bei einer Aufsichtsbehörde</li>
                    </ul>
                </Section>

                <Section title="Löschung von Daten">
                    <p>Sofern in dieser Datenschutzerklärung nicht anders angegeben, werden Daten gelöscht, sobald sie für ihre Zweckbestimmung nicht mehr erforderlich sind und der Löschung keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
                </Section>

                <Section title="Änderungen dieser Datenschutzerklärung">
                    <p>Ich behalte mir vor, diese Datenschutzerklärung bei Änderungen der Rechtslage oder des Angebots anzupassen.</p>
                    <p className="text-sm italic text-gray-500 dark:text-gray-400">Bitte nach größeren Funktionsänderungen die Inhalte prüfen und anpassen.</p>
                </Section>
            </div>
        </>
    );
}
