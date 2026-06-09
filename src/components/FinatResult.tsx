import FinishedStats from "./FinishedStats"

export default function FinalResult(){
    return(
        {stats.map((stat, i) => (
            <div
              key={i}
              className="text-left px-5 border-2 border-neutral-800 py-1 rounded-lg space-y-2"
            >
              <h1 className="text-neutral-500 text-lg">{stat.text}</h1>
              <p className={`font-semibold text-2xl ${stat.style ?? ""}`}>
                {stat.value ?? stat.render}
              </p>
            </div>
          ))}
    )
}