export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4 md:px-8">
        <div>
          <h3 className="font-display text-xl">CampusMate</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Where alumni journeys become student opportunities.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Signature</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Career Journey Map</li>
            <li>Opportunity Heatmap</li>
            <li>Career GPS</li>
            <li>Referral Marketplace</li>
            <li>Alumni Office Hours</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Community</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>City Chapters</li>
            <li>Ask Alumni</li>
            <li>Micro-Mentorship</li>
            <li>Office Hours</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">For Alumni</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Open for Guidance</li>
            <li>Post Referral</li>
            <li>Host Office Hour</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-4 py-5 text-center text-xs text-muted-foreground md:px-8">
        Prototype build · Built with care for the CampusMate community.
      </div>
    </footer>
  );
}
