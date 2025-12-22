
import { motion } from "framer-motion";
import { BarChart4, TrendingUp, PieChart, Users, Database, Globe, Award, Star } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  percentage: number;
  delay: number;
  index: number;
}

const MetricCard = ({ title, value, description, icon, color, percentage, delay, index }: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`bg-gray-900/70 rounded-xl p-5 border border-gray-800/50 shadow-lg relative overflow-hidden group`}
    >
      {/* Color accent */}
      <div className={`absolute top-0 left-0 w-full h-1 ${color} opacity-70`} />
      
      {/* Icon circle */}
      <div className={`w-12 h-12 rounded-full ${color.replace('bg-', 'bg-').replace('500', '500/20')} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      
      {/* Stat value - Changed from black to match card color scheme */}
      <h3 className={`text-3xl font-bold mb-1 ${color.replace('bg-', 'text-')}`}>{value}</h3>
      
      {/* Metric title */}
      <p className="text-white font-medium mb-2">{title}</p>
      
      {/* Description */}
      <p className="text-gray-400 text-sm mb-3">{description}</p>
      
      {/* Progress bar */}
      <div className="h-2 bg-gray-800/60 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3, duration: 0.8, ease: "easeOut" }}
        />
      </div>
      
      {/* Background glow effect */}
      <div className={`absolute -bottom-20 -right-20 w-40 h-40 ${color.replace('bg-', 'bg-').replace('500', '500/5')} rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
    </motion.div>
  );
};

const IndustrySuccessMetrics = () => {
  const metricsRow1 = [
    {
      title: "E-commerce Growth",
      value: "+210%",
      description: "Average revenue increase for e-commerce clients",
      icon: <BarChart4 className="w-6 h-6 text-blue-400" />,
      color: "bg-blue-500",
      percentage: 92,
      delay: 0.1
    },
    {
      title: "SEO Rankings",
      value: "47x",
      description: "Improvement in search visibility scores",
      icon: <TrendingUp className="w-6 h-6 text-green-400" />,
      color: "bg-green-500",
      percentage: 87,
      delay: 0.2
    },
    {
      title: "Lead Generation",
      value: "+385%",
      description: "Average increase in qualified lead capture",
      icon: <Users className="w-6 h-6 text-purple-400" />,
      color: "bg-purple-500",
      percentage: 85,
      delay: 0.3
    },
    {
      title: "Global Reach",
      value: "15+",
      description: "Countries with successful implementations",
      icon: <Globe className="w-6 h-6 text-cyan-400" />,
      color: "bg-cyan-500",
      percentage: 70,
      delay: 0.4
    },
  ];

  const metricsRow2 = [
    {
      title: "CRM Integration",
      value: "98%",
      description: "Client data accuracy after our integrations",
      icon: <Database className="w-6 h-6 text-amber-400" />,
      color: "bg-amber-500",
      percentage: 98,
      delay: 0.3
    },
    {
      title: "Engagement Rate",
      value: "4.8x",
      description: "Higher engagement on optimized campaigns",
      icon: <PieChart className="w-6 h-6 text-rose-400" />,
      color: "bg-rose-500",
      percentage: 83,
      delay: 0.4
    },
    {
      title: "Customer Retention",
      value: "+64%",
      description: "Improved retention after our strategies",
      icon: <Award className="w-6 h-6 text-emerald-400" />,
      color: "bg-emerald-500",
      percentage: 78,
      delay: 0.5
    },
    {
      title: "Client Satisfaction",
      value: "4.9/5",
      description: "Average rating from our clients",
      icon: <Star className="w-6 h-6 text-yellow-400" />,
      color: "bg-yellow-500",
      percentage: 95,
      delay: 0.6
    },
  ];

  return (
    <motion.div
      className="py-12 px-4 md:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Industry Success <span className="text-yellow-400">Metrics</span>
        </motion.h2>
        <motion.p 
          className="text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Our proven track record of delivering exceptional results across various industries
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {metricsRow1.map((metric, index) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            description={metric.description}
            icon={metric.icon}
            color={metric.color}
            percentage={metric.percentage}
            delay={metric.delay}
            index={index}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {metricsRow2.map((metric, index) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            description={metric.description}
            icon={metric.icon}
            color={metric.color}
            percentage={metric.percentage}
            delay={metric.delay}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default IndustrySuccessMetrics;
