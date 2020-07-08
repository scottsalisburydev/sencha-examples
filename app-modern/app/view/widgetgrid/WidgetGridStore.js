/**
 * https://docs.sencha.com/extjs/7.2.0/modern/Ext.data.Model.html
 */
Ext.define('Demo.view.widgetgrid.WidgetGridStore', {
    extend: 'Ext.data.Store',
    alias: 'store.widgetstore',

    fields: [
        { name: 'name' },
        { name: 'progress', type: 'float' },
        {
            name: 'rating'
        },
        'mode',
        'sequence1',
        'sequence2',
        'sequence3',
        'sequence4',
        'sequence5',
        'sequence6',
        'sequence7'
    ],
    autoLoad: true,

    data: (function () {
        var result = [],
            i,
            generateSequence = function (count, min, max) {
                var j,
                    sequence = [];

                if (count == null) {
                    count = 20;
                }

                if (min == null) {
                    min = -10;
                }

                if (max == null) {
                    max = 10;
                }

                for (j = 0; j < count; j++) {
                    sequence.push(Ext.Number.randomInt(min, max));
                }

                return sequence;
            };

        for (i = 0; i < 8; i++) {
            result.push([
                i + 1, 'Record ' + (i + 1),         // name
                Ext.Number.randomInt(0, 100) / 100, // progress
                (i & 1) ? 'Local' : 'Remote',       // mode
                generateSequence(),                 // sparklineline data
                generateSequence(15),               // sparklinebar data
                generateSequence(),                 // sparklinediscrete data

                // sparklinebullet data: target, performance, ranges
                [150, Ext.Number.randomInt(100, 280), 100, 200, 300],

                generateSequence(4, 10, 20),        // sparklinepie data
                generateSequence(),                 // sparklinebox data
                generateSequence(20, -1, 1)         // sparklinetristate data
            ]);
        }

        return result;
    })()
});