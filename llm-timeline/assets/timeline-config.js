// 时间轴配置管理
class TimelineConfig {
    constructor(options = {}) {
        // 默认配置
        this.config = {
            dataSources: [
                '../timeline-data.yaml',
                './timeline-data.yaml',
                // 'https://raw.githubusercontent.com/BytePioneer-AI/LLM-Timeline/main/timeline-data.yaml'
            ],
            
            // 布局配置
            layout: {
                showTocToggle: false,
                tocVisible: true,
                leftMargin: 0, // 为左侧目录留出的空间
                enableTocAutoHide: true // 小屏幕自动隐藏目录
            },
            
            // 样式配置
            styles: {
                customCSS: '', // 额外的CSS样式
                themeClass: '' // 主题类名
            },
            
            // 功能配置
            features: {
                enableSearch: true,
                enableTypeFilter: true,
                enableSizeFilter: true,
                enableChart: true,
                enableMarkdown: true
            },
            
            // 错误处理配置
            errorHandling: {
                showFallbackData: true,
                fallbackMessage: '数据加载失败，请稍后重试'
            },
            
            // Hexo兼容性配置
            hexo: {
                runtime_span_fix: true // 修复博客主题的运行时间脚本错误
            }
        };
        
        // 合并用户配置
        this.mergeConfig(options);
    }
    
    mergeConfig(options) {
        this.config = this.deepMerge(this.config, options);
    }
    
    deepMerge(target, source) {
        const result = { ...target };
        
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                    result[key] = this.deepMerge(target[key] || {}, source[key]);
                } else {
                    result[key] = source[key];
                }
            }
        }
        
        return result;
    }
    
    get(path) {
        const keys = path.split('.');
        let current = this.config;
        
        for (const key of keys) {
            if (current && typeof current === 'object' && key in current) {
                current = current[key];
            } else {
                return undefined;
            }
        }
        
        return current;
    }
    
    set(path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((obj, key) => {
            if (!obj[key]) obj[key] = {};
            return obj[key];
        }, this.config);
        target[lastKey] = value;
    }
}

// 预定义配置
const TIMELINE_CONFIGS = {
    // Hexo博客版本配置
    hexo: {
        dataSources: [
            '../timeline-data.yaml',
            './timeline-data.yaml',
            '../timeline-data.json',
            './new/timeline-data.yaml',
            'https://raw.githubusercontent.com/BytePioneer-AI/LLM-Timeline/main/timeline-data.yaml'
        ],
        layout: {
            showTocToggle: false,
            tocVisible: true,
            leftMargin: 0,
            enableTocAutoHide: true
        },
        features: {
            enableSearch: true,
            enableTypeFilter: true,
            enableSizeFilter: true,
            enableChart: true,
            enableMarkdown: true
        },
        hexo: {
            runtime_span_fix: true
        }
    },
    
    // 简化版本配置
    simple: {
        dataSources: [
            '../timeline-data.yaml',
            './timeline-data.yaml',
            '../timeline-data.json',
            './timeline-data.json'
        ],
        layout: {
            showTocToggle: false,
            tocVisible: true,
            leftMargin: 0,
            enableTocAutoHide: true
        },
        features: {
            enableSearch: true,
            enableTypeFilter: true,
            enableSizeFilter: true,
            enableChart: true,
            enableMarkdown: true
        }
    }
};

// 全局类型和尺寸选项配置
const TYPE_OPTIONS = [
    { key: 'lang', label: '语言', match: ['语言', '语言模型', '文本', 'LLM', 'language'] },
    { key: 'multi', label: '多模态', match: ['多模态', 'multimodal', '视频+图像+文本'] },
    { key: 'img', label: '图像', match: ['图像生成', '文生图', 'image'] },
    { key: 'video', label: '视频', match: ['视频生成', '文生视频', 'video'] },
    { key: 'code', label: '代码', match: ['代码', 'code', '编程'] },
    { key: 'voice', label: '语音', match: ['语音生成', '语音', '音频'] },
    { key: 'doc', label: '文档解析', match: ['文档', 'OCR', 'doc', '文档解析', '文档解析模型'] },
    { key: 'other', label: '其他', match: [] }
];

const SIZE_OPTIONS = [
    { label: '≤3B', type: 'lte', value: 3 },
    { label: '≤7B', type: 'lte', value: 7 },
    { label: '≤32B', type: 'lte', value: 32 },
    { label: '≤72B', type: 'lte', value: 72 },
    { label: '≤120B', type: 'lte', value: 120 },
    { label: '≤400B', type: 'lte', value: 400 },
    { label: '>400B', type: 'gt', value: 400 }
];

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TimelineConfig, TIMELINE_CONFIGS, TYPE_OPTIONS, SIZE_OPTIONS };
} else {
    window.TimelineConfig = TimelineConfig;
    window.TIMELINE_CONFIGS = TIMELINE_CONFIGS;
    window.TYPE_OPTIONS = TYPE_OPTIONS;
    window.SIZE_OPTIONS = SIZE_OPTIONS;
}