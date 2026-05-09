export default function Stats() {
  const stats = [
    { value: '15k+', label: 'Пройденных тестов' },
    { value: '500+', label: 'Описаний профессий' },
    { value: '300+', label: 'Вузов в базе' },
    { value: '98%', label: 'Довольных абитуриентов' },
  ];

  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className={`px-4 ${index !== 0 ? 'md:border-l md:border-slate-100' : ''}`}>
              <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}