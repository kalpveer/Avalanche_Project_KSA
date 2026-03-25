import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';

const LandingPage = () => {
    const navigate = useNavigate();

    const portals = [
        {
            title: "Consumer Portal",
            description: "Trace your produce back to its roots and verify authenticity on the blockchain.",
            icon: "QrCode",
            path: "/consumer-portal",
            color: "text-emerald-600",
            bgHover: "hover:bg-emerald-50/50"
        },
        {
            title: "Farmer Dashboard",
            description: "Manage your harvests, mint AGRI tokens, and track your shipments directly.",
            icon: "Sprout",
            path: "/farmer-dashboard",
            color: "text-amber-600",
            bgHover: "hover:bg-amber-50/50"
        },
        {
            title: "Distributor Hub",
            description: "Monitor logistics, trace temperatures, and ensure quality delivery.",
            icon: "Truck",
            path: "/distributor-dashboard",
            color: "text-blue-600",
            bgHover: "hover:bg-blue-50/50"
        }
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-body">
            {/* Subtle background glow components for aesthetics */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[120px] opacity-40 pointer-events-none translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-50 rounded-full blur-[100px] opacity-60 pointer-events-none -translate-x-1/3 translate-y-1/3" />

            <div className="max-w-5xl w-full z-10 pb-20">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <div className="flex items-center justify-center space-x-3 mb-8">
                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-sm">
                            <Icon name="Leaf" size={20} className="text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 uppercase">AgriChain</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tighter mb-6 leading-tight">
                        The Future of <br className="hidden md:block"/> Transparent Agriculture
                    </h1>
                    
                    <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        A blockchain-powered supply chain ecosystem ensuring food safety, fair trade, and complete traceability from farm to table.
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="grid md:grid-cols-3 gap-6"
                >
                    {portals.map((portal, index) => (
                        <div 
                            key={index}
                            onClick={() => navigate(portal.path)}
                            className={`group cursor-pointer p-8 rounded-3xl border border-slate-100 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500 ${portal.bgHover}`}
                        >
                            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 shadow-sm">
                                <Icon name={portal.icon} size={24} className={portal.color} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                                {portal.title}
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed mb-8">
                                {portal.description}
                            </p>
                            <div className="flex items-center text-sm font-semibold text-slate-900 group-hover:underline decoration-slate-300 underline-offset-4">
                                Enter Portal 
                                <Icon name="ArrowRight" size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
                            </div>
                        </div>
                    ))}
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-xs font-medium text-slate-500">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Powered by Avalanche Subnet</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LandingPage;
