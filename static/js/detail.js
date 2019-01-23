/**
 * Created by python on 19-1-22.
 */
var vm = new Vue({
    el: '#app',
    data: {
        host: host,

        id: '', // 文章id

        article:'', // 文章数据

        tags: [], // 标签
    },

    mounted: function(){
        this.id = this.get_query_string('id'); // 115

        // 获取文章数据
        axios.get(this.host+'/detail/'+this.id+"/" , {
                responseType:'json'
            })
            .then(response => {
                this.article = response.data;
            })
            .catch(error => {
                console.log(error.response.data)
            });

    },
    methods: {

        // 获取url路径参数
        get_query_string: function(name){
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURI(r[2]);
            }
            return null;
        }
    }
});