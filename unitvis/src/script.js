d3.csv('https://raw.githubusercontent.com/Lasuki/whcc-data/main/whccunitsonly-t5hpmorale.csv', function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key.replace('.',' ')]; });
    }

    colors = []
    for (i=0; i < unpack(rows, 'Type').length; i++) {
      if (unpack(rows, 'Type')[i] == "infantry") {
        colors.push(0)
      } else if (unpack(rows, 'Type')[i] == "monstrous_infantry") {
        colors.push(0.1)
      } else if (unpack(rows, 'Type')[i] == "monsters") {
        colors.push(0.4)
	  } else if (unpack(rows, 'Type')[i] == "monstrous_beasts") {
        colors.push(0.5)
	  } else if (unpack(rows, 'Type')[i] == "war_beasts") {
        colors.push(0.6)      
	  } else if (unpack(rows, 'Type')[i] == "cavalry") {
        colors.push(0.8)	  
	  } else if (unpack(rows, 'Type')[i] == "chariots") {
        colors.push(0.9)
	  } else if (unpack(rows, 'Type')[i] == "monstrous_cavalry") {
        colors.push(1.0)
		}
    }

    var pl_colorscale=[
               [0.0, '#19d3f3'],
               [0.333, '#19d3f3'],
               [0.333, '#e763fa'],
               [0.666, '#e763fa'],
               [0.666, '#636efa'],
               [1, '#636efa']
    ]

    var axis = () => ({
      showline:false,
      zeroline:false,
      gridcolor:'#ffff',
      ticklen:4
    })

    var data = [{
      type: 'splom',
      dimensions: [
        {label:'HP', values:unpack(rows,'T5HP')},
        {label:'Morale', values:unpack(rows,'Morale')}
      ],
      text: unpack(rows, 'Name'),
      marker: {
        color: colors,
        colorscale:pl_colorscale,
        size: 7,
        line: {
          color: 'white',
          width: 0.5
        }
      }
    }]

    var layout = {
      title:'Warhammer Chaos & Conquest - T5 Hitpoints & Morale',
      height: 800,
      width: 800,
      autosize: false,
      hovermode:'closest',
      dragmode:'select',
      plot_bgcolor:'rgba(240,240,240, 0.95)',
      xaxis:axis(),
      yaxis:axis(),
      xaxis2:axis(),
      xaxis3:axis(),
      xaxis4:axis(),
      yaxis2:axis(),
      yaxis3:axis(),
      yaxis4:axis()
    }

    Plotly.react('myDiv', data, layout)

});
