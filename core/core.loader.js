// Main program loader

module.exports = {

    load_all() {
        const fs = require('fs');
        const dir = __dirname.substr(0, __dirname.lastIndexOf( '/' ) ) + '/core';
        global.frostybot = {
            modules  : {},
            settings : {},
        };
        fs.readdirSync( dir ).forEach( file => {
            if ((file.indexOf('mod.') == 0) && (file.indexOf('mod.base.') < 0)) {
                var module = file.split('.')[1];
                this.load(module)
            }
        });
        this.map_all();
        this.init_all();
    },

    load(module) {
        if (!global.hasOwnProperty('frostybot')) global.frostybot = {}
        if (!global.frostybot.hasOwnProperty('_modules_')) global.frostybot._modules_ = {}
        var mod = require('./mod.' + module)
        var obj = (typeof(mod) == 'function') ? new mod() : mod
        global.frostybot._modules_[module] = obj
    },

    map_all() {
        Object.keys(global.frostybot._modules_).forEach(module => {
            if (typeof(global.frostybot._modules_[module]['module_maps']) == 'function') {
                global.frostybot._modules_[module].module_maps()
            }
        })
    },

    init_all() {
        Object.keys(global.frostybot._modules_).forEach(module => {
            if (typeof(global.frostybot._modules_[module]['initialize']) == 'function') {
                global.frostybot._modules_[module].initialize()
            }
        })
    }


}