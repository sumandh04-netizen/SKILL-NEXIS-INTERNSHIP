import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  trend,
  trendDirection,
}) {
  const hasTrend =
    trend !== undefined &&
    trend !== null &&
    trend !== "";

  const isPositive =
    trendDirection === "up";

  const isNegative =
    trendDirection === "down";

  return (
    <article className="metric-card">
      <div className="metric-card-header">
        <div className="metric-icon">
          {Icon ? (
            <Icon
              size={20}
              strokeWidth={2}
            />
          ) : null}
        </div>

        {hasTrend && (
          <div
            className={`metric-trend ${
              isPositive
                ? "positive"
                : isNegative
                ? "negative"
                : ""
            }`}
          >
            {isPositive && (
              <TrendingUp size={14} />
            )}

            {isNegative && (
              <TrendingDown size={14} />
            )}

            <span>
              {trend}
            </span>
          </div>
        )}
      </div>

      <div className="metric-card-content">
        <span className="metric-label">
          {label}
        </span>

        <strong className="metric-value">
          {value ?? 0}
        </strong>

        {detail && (
          <small className="metric-detail">
            {detail}
          </small>
        )}
      </div>
    </article>
  );
}