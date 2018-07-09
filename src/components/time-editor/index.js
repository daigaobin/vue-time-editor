import TimeEditor from './src/main';

/* istanbul ignore next */
TimeEditor.install = function(Vue) {
    Vue.component(TimeEditor.name, TimeEditor);
};

// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(TimeEditor)
}

export default TimeEditor;