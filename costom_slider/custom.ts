import {UIElement, UIElementView} from "models/ui/ui_element"

import {div} from "core/dom"
import * as p from "core/properties"

export class CustomView extends UIElementView {

  override connect_signals(): void {
    super.connect_signals()

    // Set BokehJS listener so that the program can process new data when
    // the slider has a change event.
    this.connect(this.model.slider.change, () => {
      this.render()
    })
  }

  override render(): void {
    // BokehJS views create <div> elements by default. These are accessible
    // as ``this.el``. Many Bokeh views ignore the default <div> and
    // instead do things like draw to the HTML canvas. In this case though,
    // the program changes the contents of the <div> based on the current
    // slider value.
    super.render()

    this.shadow_el.appendChild(div({
      style: {
        padding: '2px',
        color: '#b88d8e',
        backgroundColor: '#2a3153',
      },
    }, `${this.model.text}: ${this.model.slider.value}`))
  }
}

export class Custom extends UIElement {
  slider: {value: string}

  // Generally, the ``__name__`` class attribute should match the name of
  // the corresponding Python class exactly. TypeScript matches the name
  // automatically during compilation, so, barring some special cases, you
  // don't have to do this manually. This helps avoid typos, which stop
  // serialization/deserialization of the model.
  static __name__ = "Surface3d"

  static {
    // If there is an associated view, this is typically boilerplate.
    this.prototype.default_view = CustomView

    // The this.define() block adds corresponding "properties" to the JS
    // model. These should normally line up 1-1 with the Python model
    // class. Most property types have counterparts. For example,
    // bokeh.core.properties.String will correspond to ``String`` in the
    // JS implementation. Where JS lacks a given type, you can use
    // ``p.Any`` as a "wildcard" property type.
    this.define<Custom.Props>(({String, Ref}) => ({
      text:   [ String ],
      slider: [ Ref(Slider) ],
    }))
  }
}