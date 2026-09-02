const PrivacyPolicy = () => {
	return (
		<main className="min-h-screen bg-(--bgc-primary) px-4 py-10 text-(--text) sm:px-6 lg:px-8">
			<div className="mx-auto max-w-4xl">
				<div className="relative overflow-hidden rounded-3xl border border-(--bgc-secondary) bg-(--bgc-tertiary)/60 shadow-[0_18px_48px_rgba(0,0,0,0.2)] backdrop-blur-sm">
					<div className="pointer-events-none absolute left-10 right-10 top-0 h-px bg-(--accent)/45" />

					<div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
						<header className="mb-10 border-b border-white/8 pb-8">
							<div className="mb-4 flex items-center gap-3">
								<span className="h-2.5 w-2.5 rounded-full bg-(--accent) shadow-[0_0_18px_var(--accent)]" />
								<span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-(--text-secondary)">
									Ludio
								</span>
							</div>

							<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
								Privacy Policy
							</h1>

							<p className="mt-3 text-sm leading-relaxed text-(--text-secondary)">
								Information about how Ludio collects, uses and protects personal
								data.
							</p>

							<p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-(--text-secondary)">
								Last updated: September 2, 2026
							</p>
						</header>

						<div className="flex flex-col gap-9 text-sm leading-7 text-(--text-secondary)">
							<section>
								<h2 className="mb-3 text-lg font-bold text-(--text)">
									1. Data Controller
								</h2>

								<p>
									The data controller responsible for personal data processed
									through Ludio is:
								</p>

								<div className="mt-4 rounded-2xl border border-white/8 bg-white/3 px-4 py-4">
									<p className="font-semibold text-(--text)">
										Patryk Olszewski
									</p>
									<p>patryk.o.dev@gmail.com</p>
								</div>
							</section>

							<section>
								<h2 className="mb-3 text-lg font-bold text-(--text)">
									2. What data we collect
								</h2>

								<p>
									Ludio uses Twitch authentication to allow users to sign in and
									use the application. Depending on the features used, Ludio may
									process:
								</p>

								<ul className="mt-3 list-disc space-y-1 pl-5 marker:text-(--accent)">
									<li>Twitch user ID</li>
									<li>Twitch username and display name</li>
									<li>Profile picture URL</li>
									<li>Authentication-related information</li>
									<li>Game sessions and their results</li>
									<li>Answers and other data generated during gameplay</li>
									<li>Technical information required to operate the service</li>
								</ul>

								<p className="mt-4">
									Ludio does not receive or store your Twitch password.
								</p>
							</section>

							<section>
								<h2 className="mb-3 text-lg font-bold text-(--text)">
									3. How we use your data
								</h2>

								<p>Your data is used to:</p>

								<ul className="mt-3 list-disc space-y-1 pl-5 marker:text-(--accent)">
									<li>authenticate your account</li>
									<li>identify your Ludio account</li>
									<li>create and manage quiz sessions</li>
									<li>provide multiplayer gameplay features</li>
									<li>save information necessary for the service to work</li>
									<li>maintain the security of the application</li>
									<li>diagnose technical problems and errors</li>
								</ul>

								<p className="mt-4">
									Ludio does not sell personal data or use it to create
									advertising profiles.
								</p>
							</section>

							<section>
								<h2 className="mb-3 text-lg font-bold text-(--text)">
									4. Legal basis
								</h2>

								<p>
									Data necessary to create an account, authenticate users and
									provide the core functionality of Ludio is processed under
									Article 6(1)(b) of the GDPR, where processing is necessary for
									the performance of the service requested by the user.
								</p>

								<p className="mt-4">
									Data processed for security, abuse prevention and technical
									diagnostics may be processed under Article 6(1)(f) of the
									GDPR, based on the legitimate interest of maintaining a secure
									and reliable service.
								</p>
							</section>

							<section>
								<h2 className="mb-3 text-lg font-bold text-(--text)">
									5. Twitch
								</h2>

								<p>
									Ludio uses Twitch OAuth and Twitch API services for
									authentication and application functionality.
								</p>

								<p className="mt-4">
									When you log in using Twitch, you authorize Ludio to access
									the information required by the application. Twitch processes
									your data independently according to its own privacy policy.
								</p>
							</section>

							<section>
								<h2 className="mb-3 text-lg font-bold text-(--text)">
									6. Data storage
								</h2>

								<p>
									Account data is stored for as long as necessary to provide
									Ludio's services. When an account is deleted, personal data
									associated with that account is deleted unless continued
									storage is required by law.
								</p>

								<p className="mt-4">
									Temporary game-session data may be automatically removed after
									a session ends or after a defined period of inactivity.
								</p>
							</section>

							<section>
								<h2 className="mb-3 text-lg font-bold text-(--text)">
									7. Redis and temporary data
								</h2>

								<p>
									Ludio may use Redis to temporarily store active game state,
									session information, synchronization data and security
									mechanisms. This data is used to operate the service and is
									not intended to serve as permanent user profile storage.
								</p>
							</section>

							<section>
								<h2 className="mb-3 text-lg font-bold text-(--text)">
									8. Hosting and third parties
								</h2>

								<p>
									Ludio uses third-party infrastructure providers to operate its
									servers and services. Currently, Ludio's server infrastructure
									is hosted using Oracle Cloud Infrastructure.
								</p>

								<p className="mt-4">
									Personal data may also be processed by Twitch where required
									for authentication and Twitch API functionality.
								</p>
							</section>

							<section>
								<h2 className="mb-3 text-lg font-bold text-(--text)">
									9. Technical logs
								</h2>

								<p>
									Ludio may store technical logs containing information
									necessary to maintain security, diagnose errors and ensure the
									proper operation of the service.
								</p>
							</section>

							<section>
								<h2 className="mb-3 text-lg font-bold text-(--text)">
									10. Cookies and local storage
								</h2>

								<p>
									Ludio may use cookies or browser storage mechanisms where
									necessary for authentication, session management, security and
									application functionality.
								</p>
							</section>

							<section>
								<h2 className="mb-3 text-lg font-bold text-(--text)">
									11. Your rights
								</h2>

								<p>
									Under the GDPR, you may have the right to access, rectify,
									erase, restrict or transfer your personal data. You may also
									object to certain types of processing and withdraw consent
									where processing is based on consent.
								</p>

								<p className="mt-4">
									To exercise your rights or ask questions about your data,
									contact:
								</p>

								<div className="mt-4 rounded-2xl border border-(--accent)/20 bg-(--accent)/5 px-4 py-4 text-(--text)">
									[YOUR CONTACT EMAIL]
								</div>
							</section>

							<section>
								<h2 className="mb-3 text-lg font-bold text-(--text)">
									12. Right to lodge a complaint
								</h2>

								<p>
									If you believe that your personal data is being processed in
									violation of applicable data protection law, you have the
									right to lodge a complaint with the relevant data protection
									supervisory authority.
								</p>

								<p className="mt-4">
									For users in Poland, the relevant authority is the President
									of the Personal Data Protection Office (UODO).
								</p>
							</section>

							<section>
								<h2 className="mb-3 text-lg font-bold text-(--text)">
									13. Data security
								</h2>

								<p>
									Ludio uses appropriate technical and organizational measures
									to protect personal data against unauthorized access,
									alteration, loss or disclosure.
								</p>
							</section>

							<section>
								<h2 className="mb-3 text-lg font-bold text-(--text)">
									14. Open source
								</h2>

								<p>
									Ludio's source code may be publicly available as an open
									source project. Public access to the source code does not mean
									that user data, production databases, authentication tokens,
									API keys or other confidential information are publicly
									accessible.
								</p>
							</section>

							<section>
								<h2 className="mb-3 text-lg font-bold text-(--text)">
									15. Changes to this Privacy Policy
								</h2>

								<p>
									This Privacy Policy may be updated when Ludio's functionality,
									infrastructure, data processing practices or applicable laws
									change. The current version will always be available on this
									page.
								</p>
							</section>
						</div>

						<footer className="mt-10 border-t border-white/8 pt-6">
							<p className="text-center text-xs text-(--text-secondary)">
								Ludio · Privacy Policy
							</p>
						</footer>
					</div>
				</div>
			</div>
		</main>
	);
};

export default PrivacyPolicy;
