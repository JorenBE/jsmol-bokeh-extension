from bokeh.layouts import column
from bokeh.models import Slider
from bokeh.plotting import curdoc, figure, show

# Create a simple scatter plot
plot = figure(title="Slider Example", tools="pan,box_zoom,reset")
points = plot.scatter(x=[1, 2, 3, 4, 5], y=[6, 7, 2, 4, 8])

# Create a slider widget
slider = Slider(start=1, end=10, value=5, step=1, title="Slider")

# Define a callback function to update the plot based on the slider's value
def update(attr, old, new):
    points.data_source.data['x'] = [x * new for x in [1, 2, 3, 4, 5]]

# Attach the callback function to the slider's value attribute
slider.on_change('value', update)

# Create a layout for the plot and slider
layout = column(slider, plot)

# Add the layout to the current document (curdoc)
curdoc().add_root(layout)
show(layout)