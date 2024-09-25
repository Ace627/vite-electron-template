// 不显示窗口控制台关于 webSecurity 的警告日志
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

// 兼容 CommonJS 的内置变量
globalThis.__filename = import.meta.filename
globalThis.__dirname = import.meta.dirname
