from bokeh.core.properties import String, Instance
from bokeh.models import UIElement, Slider

class Custom(UIElement):

    text = String(default="Custom text")

    slider = Instance(Slider)