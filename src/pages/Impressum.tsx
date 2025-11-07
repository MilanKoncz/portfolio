import { Helmet } from 'react-helmet';
import { siteMeta, contact } from '../config/site';

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

export default function Impressum() {
    return (
        <>
            <Helmet>
                <title>Impressum | {siteMeta.title.split(' - ')[0]}</title>
                <meta name="robots" content="noindex,follow" />
                <link rel="canonical" href={`${siteMeta.baseUrl}/impressum`} />
            </Helmet>

            <div className="container mx-auto px-4 py-16 max-w-3xl">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Impressum</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-prose">Rechtliche Pflichtangaben & Hinweise gemäß deutschem Telemedienrecht.</p>
                </header>

                <Section title="Angaben gemäß § 5 TMG">
                    <p className="m-0">
                        <strong>Milan Koncz</strong><br />
                        Hafenstraße 35<br />
                        68159 Mannheim<br />
                        Deutschland
                    </p>
                    <p className="m-0">E-Mail: <a href={`mailto:${contact.email}`} className="text-blue-600 dark:text-blue-400 underline underline-offset-2">{contact.email}</a></p>
                </Section>

                <Section title="Verantwortlich für den Inhalt (§ 55 Abs. 2 RStV)">
                    <p className="m-0">Milan Koncz, Anschrift wie oben.</p>
                </Section>

                <Section title="Haftung für Inhalte">
                    <p>Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.</p>
                    <p>Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
                    <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.</p>
                    <p>Bei Bekanntwerden von entsprechenden Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.</p>
                </Section>

                <Section title="Haftung für Links">
                    <p>Mein Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen.</p>
                    <p>Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft; rechtswidrige Inhalte waren nicht erkennbar.</p>
                    <p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Links umgehend entfernen.</p>
                </Section>

                <Section title="Urheberrecht">
                    <p>Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.</p>
                    <p>Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
                    <p>Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit Inhalte nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet.</p>
                </Section>
            </div>
        </>
    );
}
