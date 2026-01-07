import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PricingChart = () => {
  const chartData = [
    {
      service: 'Creative and Design',
      fullName: 'Creative and Design Services',
      'Agency Cost': 16000,
      'Askit Cost': 11200,
    },
    {
      service: 'Digital Marketing',
      fullName: 'Digital Marketing Package',
      'Agency Cost': 18000,
      'Askit Cost': 12600,
    },
    {
      service: 'Content Writing',
      fullName: 'Content/Blogs/Copywriting',
      'Agency Cost': 6000,
      'Askit Cost': 3000,
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const agencyCost = payload.find((p: any) => p.dataKey === 'Agency Cost')?.value || 0;
      const askitCost = payload.find((p: any) => p.dataKey === 'Askit Cost')?.value || 0;
      const savings = agencyCost - askitCost;
      const savingsPercentage = agencyCost > 0 ? Math.round((savings / agencyCost) * 100) : 0;
      
      return (
        <div className="bg-card border-2 border-primary/20 rounded-lg p-4 shadow-xl min-w-[200px]">
          <p className="font-bold mb-3 text-base leading-tight">{payload[0].payload.fullName}</p>
          <div className="space-y-1.5">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex justify-between items-center gap-4">
                <span className="text-sm font-medium">{entry.name}:</span>
                <span 
                  style={{ color: entry.color }} 
                  className="text-sm font-bold whitespace-nowrap"
                >
                  ₹{entry.value.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
            {savings > 0 && (
              <div className="pt-2 mt-2 border-t border-border">
                <div className="flex justify-between items-center gap-4">
                  <span className="text-sm font-medium">You Save:</span>
                  <span className="text-sm font-bold text-primary">
                    ₹{savings.toLocaleString('en-IN')} ({savingsPercentage}%)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-background to-muted/30 shadow-lg">
      <CardHeader className="space-y-3 pb-6">
        <CardTitle className="text-center text-2xl md:text-3xl leading-tight">
          Industry vs. Askit <span className="text-primary">Pricing Comparison</span>
        </CardTitle>
        <p className="text-center text-muted-foreground text-sm md:text-base">
          Monthly pricing comparison (in ₹)
        </p>
      </CardHeader>
      <CardContent className="px-4 md:px-6">
        <div className="w-full overflow-x-auto">
          <ResponsiveContainer width="100%" height={450} minWidth={300}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 40, left: 60, bottom: 80 }}
              barGap={8}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="service" 
                angle={0}
                textAnchor="middle"
                height={100}
                interval={0}
                tick={{ 
                  fill: 'hsl(var(--foreground))',
                  fontSize: 12,
                  fontWeight: 500
                }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ 
                  fill: 'hsl(var(--foreground))',
                  fontSize: 12
                }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                label={{ 
                  value: 'Monthly Cost (₹)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { 
                    fill: 'hsl(var(--foreground))',
                    fontSize: 14,
                    fontWeight: 600
                  }
                }}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: 'hsl(var(--primary))', opacity: 0.1 }}
              />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '30px',
                  fontSize: '14px'
                }}
                iconType="square"
                iconSize={16}
              />
              <Bar 
                dataKey="Agency Cost" 
                fill="hsl(var(--muted-foreground))" 
                radius={[8, 8, 0, 0]}
                name="Agency Cost"
                maxBarSize={80}
              />
              <Bar 
                dataKey="Askit Cost" 
                fill="hsl(var(--primary))" 
                radius={[8, 8, 0, 0]}
                name="Askit Cost"
                maxBarSize={80}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-8 text-center space-y-3 px-2">
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Agency pricing varies widely by scope and campaign. Askit connects MSMEs with student talent for <span className="text-primary font-semibold">30–60% lower costs</span> without compromising creativity or quality.
          </p>
          <p className="text-xs text-muted-foreground italic">
            * Values shown are approximate monthly averages for comparison
          </p>
          <p className="text-xs text-muted-foreground italic">
            * These prices are estimates taken from the internet for viewer's reference
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingChart;
