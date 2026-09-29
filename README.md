<div align="center">

<img src="docs/images/logo.svg" alt="Revaluate logo" width="88">

# Revaluate

**A side project that made it out into the world.**

Built outside my day job, launched publicly in 2015, and run in production for over a year.

[![Product Hunt: 124 upvotes](https://img.shields.io/badge/Product%20Hunt-124%20upvotes-da552f)](https://www.producthunt.com/products/revaluate)
![Developed 2015–2017](https://img.shields.io/badge/developed-2015%E2%80%932017-8250df)
![Product: retired](https://img.shields.io/badge/product-retired-lightgrey)

[The story](#beyond-the-day-job) · [Screenshots](#a-tour-of-the-app) · [Backend](https://github.com/ioanlucut/revaluate-api) · [Technical notes](docs/engineering.md)

</div>

## Beyond the day job

Revaluate was a personal finance app I built in my free time with Sorin Pantis, who led product and design. The idea was simple: make logging an expense as quick as typing one line, then help people understand where their money goes.

I took on the engineering: the front-end architecture and most of the application code, the whole Java backend, and the build and deployment pipeline. Sorin shaped the product, designed the interface, and contributed much of the styling. Together, we took it beyond a local project and launched it publicly.

That meant building more than the expense tracker itself. The product had account management, subscriptions and payments, imports from other finance apps, spending goals, and a Slack integration. It also meant continuing to ship after launch: new features, releases, and eventually a redesign.

I’m sharing it now because it was a big part of what I built outside work: not just getting the first version out, but spending the next year making it better.

## From side project to public launch

- **February 2015:** work began on the web app, two weeks after the API.

- **27 June 2015:** we launched the public beta at `revaluate.io`.

- **11 September 2015:** Revaluate was featured on [Product Hunt](https://www.producthunt.com/products/revaluate), with 124 upvotes.

- **By October 2015:** we had shipped 15 releases, adding features including goals and the Slack integration.

- **Through 2016:** the app stayed in production while we continued development, including a move to ES2015 modules and a visual redesign. The last production deployment was in November 2016; the redesign was merged in March 2017.

<img src="docs/images/landing-page.png" alt="Revaluate's original landing page: Change the way you spend your money" width="100%">

## A tour of the app

The core experience was keyboard-first expense entry, with custom categories, monthly spending insights, and goals. CSV imports let users bring their history from Mint or Spendee rather than start from scratch.

<table>
<tr>
<td width="50%"><img src="docs/images/expenses.png" alt="Expense entry with category autocomplete, a day-by-day timeline, and a daily spending chart"></td>
<td width="50%"><img src="docs/images/goals.png" alt="Monthly spending goals with progress bars"></td>
</tr>
<tr>
<td><sub><b>Expenses.</b> Log an expense in one line and see the month's spending.</sub></td>
<td><sub><b>Goals.</b> Set a monthly target and track progress against today.</sub></td>
</tr>
<tr>
<td><img src="docs/images/insights-monthly-doughnut.png" alt="Monthly spending breakdown by category"></td>
<td><img src="docs/images/insights-progress.png" alt="Category spending trends across six months"></td>
</tr>
<tr>
<td><sub><b>Monthly insights.</b> See where the money went.</sub></td>
<td><sub><b>Trends.</b> Compare spending across categories and months.</sub></td>
</tr>
<tr>
<td><img src="docs/images/insights-overview.png" alt="Monthly spending totals displayed as a bar chart and table"></td>
<td><img src="docs/images/settings-import.png" alt="Mapping imported Spendee categories to Revaluate categories"></td>
</tr>
<tr>
<td><sub><b>Overview.</b> Compare month-over-month totals.</sub></td>
<td><sub><b>Import.</b> Review and map categories before bringing in old expenses.</sub></td>
</tr>
</table>

<sub>Screenshots are from the 2015 press kit. The code on <code>main</code> includes the later redesign.</sub>

## The people behind it

- **[Ioan Lucuț](https://github.com/ioanlucut) — engineering.** Front-end architecture and most application code, the build and deployment pipeline, and the whole [`revaluate-api`](https://github.com/ioanlucut/revaluate-api) backend.

- **[Sorin Pantis](https://github.com/sorinpantis) — product and design.** Visual design, the landing page, and much of the styling; about 40% of this repository's commits.

- **Felix — early test coverage.** Wrote the first Protractor end-to-end tests.

## Looking back at the code

Revaluate is retired now. This repository preserves the AngularJS frontend as it was built; the old toolchain no longer installs as-is. The Java backend lives in [`revaluate-api`](https://github.com/ioanlucut/revaluate-api).

If you're curious about how it worked, the [technical notes](docs/engineering.md) go into the architecture and implementation. Credentials and personal data were removed from the history before publication.

[MIT](LICENSE) © 2015–2026 Ioan Lucuț
