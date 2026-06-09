// components/FinishedStats.tsx
interface Stat {
    text: string;
    value?: string | number;
    style?: string;
    render?: React.ReactNode;
  }
  
  interface FinishedStatsProps {
    stats: Stat[];
  }
  
  export default function FinishedStats({ stats }: FinishedStatsProps) {
    return (
      <div className="flex gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            <p className="text-neutral-500 text-sm">{stat.text}</p>
            {stat.render ? (
              <div className={stat.style}>{stat.render}</div>
            ) : (
              <p className={stat.style}>{stat.value}</p>
            )}
          </div>
        ))}
      </div>
    );
  }