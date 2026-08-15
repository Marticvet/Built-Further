type CaseVisualProps = { theme: "blue" | "sand" | "mint"; name: string };

export default function CaseVisual({ theme, name }: CaseVisualProps) {
    return (
        <div className={`caseVisual caseVisual-${theme}`} aria-label={`${name} product interface preview`}>
            <div className="caseWindow">
                <div className="caseWindowBar"><i /><i /><i /><span>{name}</span></div>
                <div className="caseWindowBody">
                    <aside><b>{name.slice(0, 1)}</b><i /><i /><i /><i /></aside>
                    <div className="caseCanvas">
                        <div className="caseTopline"><span /><i /></div>
                        <div className="caseMetrics"><i /><i /><i /></div>
                        <div className="caseGraph"><span /><span /><span /><span /><span /><span /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
