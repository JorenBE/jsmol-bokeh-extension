from bokeh.core.properties import String, Instance
from bokeh.models import UIElement, Slider
from bokeh.layouts import column
from bokeh.io import show

class Custom(UIElement):

    __implementation__ = "custom.ts"

    text = String(default="Custom text")

    slider = Instance(Slider)


slider = Slider(start=0, end=10, step=0.1, value=0, title="value")

custom = Custom(text="Special Slider Display", slider=slider)

layout = column(slider, custom)

show(layout)