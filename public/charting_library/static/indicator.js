__customIndicators = [
    {
        // The name will be used internally by the Charting Library
        name: "Test Indicator v1.0",
        overlay: false,
        metainfo: {
            "_metainfoVersion": 40,
            "id": "test@tv-basicstudies-1",
            "scriptIdPart": "",
            "name": "Test Indicator v1.0",

            // This description will be displayed in the Indicators window
            // It is also used as a "name" argument when calling the createStudy method
            "description": "Test Indicator v1.0",

            // This description will be displayed on the chart
            "shortDescription": "testt",

            "is_hidden_study": false,
            "is_price_study": false,
            "isCustomIndicator": true,
            "overlay": false,

            "plots": [{"id": "plot_0", "type": "line"}],
            "defaults": {
                "styles": {
                    "plot_0": {
                        "linestyle": 0,
                        "visible": true,
                        // Plot line width.
                        "linewidth": 3,

                        // Plot type:
                        //    1 - Histogram
                        //    2 - Line
                        //    3 - Cross
                        //    4 - Area
                        //    5 - Columns
                        //    6 - Circles
                        //    7 - Line With Breaks
                        //    8 - Area With Breaks
                        "plottype": 2,

                        // Show price line?
                        "trackPrice": false,

                        // Plot transparency, in percent.
                        "transparency": 40,

                        // Plot color in #RRGGBB format
                        "color": "#8dfffa"
                    }
                },

                // Precision of the study's output values
                // (quantity of digits after the decimal separator).
                "precision": 2,

                "inputs": {}
            },
            "styles": {
                "plot_0": {
                    // Output name will be displayed in the Style window
                    "title": "titlee",
                    "histogramBase": 0,
                }
            },
            "inputs": [],
        },

        constructor: function () {
            // const tulind = import('tulind')

            this.init = function (context, inputCallback) {
                this._context = context;
                this._input = inputCallback;

                // Define the symbol to be plotted.
                // Symbol should be a string.
                // You can use PineJS.Std.ticker(this._context) to get the selected symbol's ticker.
                // For example,
                //    var symbol = "AAPL";
                //    var symbol = "#EQUITY";
                //    var symbol = PineJS.Std.ticker(this._context) + "#TEST";
                var symbol = PineJS.Std.ticker(this._context);
                this._context.new_sym(symbol, PineJS.Std.period(this._context), PineJS.Std.period(this._context));
            };

            this.main = function (context, inputCallback) {


                this._context = context;
                this._input = inputCallback;

                this._context.select_sym(1);

                // You can use following built-in functions in PineJS.Std object:
                //    open, high, low, close
                //    hl2, hlc3, ohlc4
                // var v = PineJS.Std.close(this._context)


                let src = PineJS.Std.close(this._context);


                // let f1 = this._context.new_var();
                // let _f1 = 5
                // f1.set(_f1)
                // f1 = _f1
                //
                // return [f1]

                return [1]

                //
                //
                //
                //
                //
                // return [src.get(0)*2]
                //
                const length=14
                const lvlob = 70
                const lvlos = 30
                const mid  = 50
                const clampmax = 100
                const clampmin = 0
                //
                let f90_ = this._context.new_var();

                let f88 = this._context.new_var();

                f90_.set((PineJS.Std.nz(f90_.get(1)) === 0.0) ? 1.0 : (PineJS.Std.nz(f88.get(1)) <= PineJS.Std.nz(f90_.get(1))) ? PineJS.Std.nz(f88.get(1))+1 : PineJS.Std.nz(f90_.get(1))+1)

                f88.set((PineJS.Std.nz(f90_.get(1)) === 0.0) && (length-1 >= 5) ? length-1.0 : 5.0)


                let f8 = this._context.new_var();
                f8.set(src*100)

                let f18 = this._context.new_var();
                f18.set(3.0 / (length + 2.0))

                let f20 = this._context.new_var();

                f20.set(1.0 - f18.get(0))



                //
                let f10 = this._context.new_var();
                f10.set(PineJS.Std.nz(f8.get(1)))
                //
                let v8 = this._context.new_var();
                v8.set(f8.get(0) - f10.get(0))
                //
                //
                //
                let f28 = this._context.new_var();
                f28.set(f20.get(0) * PineJS.Std.nz(f28.get(1)) + f18.get(0) * v8.get(0))
                //
                let f30 = this._context.new_var();
                f30.set(f18.get(0) * f28.get(0) + f20.get(0) * PineJS.Std.nz(f30.get(1)))
                //
                let vC = this._context.new_var();
                vC.set(f28.get(0) * 1.5 - f30.get(0) * 0.5)

                let f38 = this._context.new_var();
                f38.set(f20.get(0) * PineJS.Std.nz(f38.get(1)) + f18.get(0) * vC.get(0))

                let f40 = this._context.new_var();
                f40.set(f18.get(0) * f38.get(0) + f20.get(0) * PineJS.Std.nz(f40.get(1)))

                // return [f40.get(0)]

                let v10 = this._context.new_var();
                v10.set(f38.get(0) * 1.5 - f40.get(0) * 0.5)

                let f48 = this._context.new_var();
                f48.set(f20.get(0) * PineJS.Std.nz(f48.get(1)) + f18.get(0) * v10.get(0))

                let f50 = this._context.new_var();
                f50.set(f18.get(0) * f48.get(0) + f20.get(0) * PineJS.Std.nz(f50.get(1)))

                let v14 = this._context.new_var();
                v14.set(f48.get(0) * 1.5 - f50.get(0) * 0.5)

                // return [v14.get(0)]

                let f58 = this._context.new_var();
                f58.set(f20.get(0) * PineJS.Std.nz(f58.get(1)) + f18.get(0) * Math.abs(v8.get(0)))

                let f60 = this._context.new_var();
                f60.set(f18.get(0) * f58.get(0) + f20.get(0) * PineJS.Std.nz(f60.get(1)))

                let v18 = this._context.new_var();
                v18.set(f58.get(0) * 1.5 - f60.get(0) * 0.5)

                let f68 = this._context.new_var();
                f68.set(f20.get(0) * PineJS.Std.nz(f68.get(1)) + f18.get(0) * v18.get(0))

                let f70 = this._context.new_var();
                f70.set(f18.get(0) * f68.get(0) + f20.get(0) * PineJS.Std.nz(f70.get(1)))

                // return [f70.get(0)]
                //
                let v1C = this._context.new_var();
                v1C.set(f68.get(0) * 1.5 - f70.get(0) * 0.5)

                let f78 = this._context.new_var();
                f78.set(f20.get(0) * PineJS.Std.nz(f78.get(1)) + f18.get(0) * v1C.get(0))

                let f80 = this._context.new_var();
                f80.set(f18.get(0) * f78.get(0) + f20.get(0) * PineJS.Std.nz(f80.get(1)))

                let v20 = this._context.new_var();
                v20.set(f78.get(0) * 1.5 - f80.get(0) * 0.5)

                // return [v20.get(0)]


                let f0 = this._context.new_var();
                f0.set(((f88.get(0) >= f90_.get(0)) && (f8.get(0) !== f10.get(0))) ? 0.0  : 0.0)

                // return [f0.get(0)]

                let f90 = this._context.new_var();
                f90.set(6)
                // f90.set(((f88.get(0) === f90_.get(0)) && (f0.get(0) === 0.0))  ? 0.0  : f90_.get(0))


                // return [f90.get(0)]

                let v4_ = this._context.new_var();
                // v4_.set(((f88.get(0) < f90.get(0)) && (v20.get(0) > 0.0000000001)) ? (v14.get(0) / v20.get(0) + 1.0) * 50.0 : 50.0)
                v4_.set((v14.get(0) / v20.get(0) + 1.0) * 50.0)

                // return [v4_.get(0)]

                let rsx = this._context.new_var();
                rsx.set((v4_.get(0) > 100.0) ? 100.0 : (v4_.get(0) < 0.0) ? 0.0 : v4_.get(0))
                //
                return [rsx.get(0)]


                // hline(lvlob, color=red, title="OB Level"), hline(mid,linewidth=2, title="Mid Level"), hline(lvlos, color=green, title="OS Level"),
                //     plot(rsx, color=red, linewidth=2, title="RSXC")




                // var il_var_0 = this._input(0);
                // var series_0 = this._context.new_var(PineJS.Std.hl2(this._context));
                // var xMaxH = PineJS.Std.highest(series_0, il_var_0, this._context);
                //
                // var series_1 = this._context.new_var(PineJS.Std.hl2(this._context));
                // var xMinL = PineJS.Std.lowest(series_1, il_var_0, this._context);
                //
                // var il_var_3 = this._context.new_var();
                // var aux_var_0 = this.f_0(0.66*((PineJS.Std.hl2(this._context)-xMinL)/PineJS.Std.max(xMaxH-xMinL, 0.001)-0.5)+0.67*PineJS.Std.nz(il_var_3.get(1)));
                // il_var_3.set(aux_var_0[0]);
                // var il_var_4 = this._context.new_var();
                // il_var_4.set(0.5*PineJS.Std.log((1+il_var_3.get(0))/PineJS.Std.max(1-il_var_3.get(0), 0.001))+0.5*PineJS.Std.nz(il_var_4.get(1)));
                // var il_var_5 = il_var_4.get(1);
                // var il_var_6 = il_var_4.get(0);
                // // return [il_var_5];

            }

        }

    }

];
