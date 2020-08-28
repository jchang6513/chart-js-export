Chart.pluginService.register({
  beforeDraw: function (c) {
    fillStyle = c.config.options.canvas && c.config.options.canvas.backgroundColor;
    if (fillStyle) {
      var chart = c.chart;
      var ctx = chart.ctx;

      ctx.save();
      ctx.fillStyle = fillStyle;
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  }
});
