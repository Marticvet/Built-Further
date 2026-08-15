import type { Dictionary } from "@/i18n/get-dictionary";
import styles from "../scss/home/home.module.scss";

export default function HeroDashboard({ t, accessibility }: { t: Dictionary["home"]["dashboard"]; accessibility: Dictionary["common"]["accessibility"] }) {
    return (
        <div className={styles.visual} aria-label={accessibility.dashboardPreview}>
            <div className={styles.orbit} aria-hidden="true" />
            <div className={styles.dashboard}>
                <div className={styles.dashboardTop}><div className={styles.dots}><i /><i /><i /></div><span>{t.overview}</span><b>BF</b></div>
                <div className={styles.dashboardBody}>
                    <aside><span className={styles.miniLogo}>BF</span><i className={styles.active} /><i /><i /><i /></aside>
                    <div className={styles.dashboardContent}>
                        <div className={styles.greeting}><div><small>{t.greeting}</small><strong>{t.focus}</strong></div><span className={styles.avatar}>M</span></div>
                        <div className={styles.stats}>
                            <div><small>{t.activeUsers}</small><strong>24,892</strong><span>↑ 12.4%</span></div>
                            <div><small>{t.conversion}</small><strong>8.42%</strong><span>↑ 3.1%</span></div>
                            <div><small>{t.revenue}</small><strong>€148k</strong><span>↑ 18.7%</span></div>
                        </div>
                        <div className={styles.chartCard}>
                            <div><small>{t.performance}</small><b>{t.period}</b></div>
                            <svg viewBox="0 0 520 180" role="img" aria-label={accessibility.performanceChart}>
                                <defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#88c7e6" stopOpacity=".38" /><stop offset="1" stopColor="#88c7e6" stopOpacity="0" /></linearGradient></defs>
                                <path className={styles.chartArea} d="M0 154 C45 138 60 148 100 122 S170 130 210 96 S278 112 318 70 S392 80 430 44 S482 42 520 12 V180 H0Z" />
                                <path className={styles.chartLine} d="M0 154 C45 138 60 148 100 122 S170 130 210 96 S278 112 318 70 S392 80 430 44 S482 42 520 12" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.floatingCard}><span>{t.growth}</span><strong>+18.7%</strong></div>
        </div>
    );
}
