import Vue from "vue"

import {
    Form,
    FormItem,
    Input,
    Button,
    MessageBox,
    Message
} from "element-ui"

Vue.use(Form)

Vue.use(FormItem)

Vue.use(Input)

Vue.use(Button)

Vue.prototype.$message = Message

Vue.prototype.$confirm = MessageBox.confirm