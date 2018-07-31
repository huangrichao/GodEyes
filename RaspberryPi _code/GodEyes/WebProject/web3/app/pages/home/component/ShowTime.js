export default class ShowTime extends React.Component {
    constructor() {
        super();
        this.state = {
            showTimer01:''
        }
        this.handleClick=this.handleClick.bind(this)

        this.showTimer = null;
    }

    handleClick() {
        //console.log('isRed')
        this.setState({isRed : !this.state.isRed});
        //console.log(this.state.isRed)

    }

    treat(){
        let i=1;
        var myDate = new Date();
        //document.getElementsByClassName('year')[0].innerHTML = myDate.getFullYear();
        var year = myDate.getFullYear()

        var month = myDate.getMonth()+1;
        month =(month<10 ? "0"+month:month);

        //document.getElementsByClassName('month')[0].innerHTML = month; // 月份自动加0

        var day = myDate.getDate();
        day =(day<10 ? "0"+day:day);

        //document.getElementsByClassName('day')[0].innerHTML = day; // 日子自动加0;

        var hour = myDate.getHours();
        hour =(hour<10 ? "0"+hour:hour);

        //document.getElementsByClassName('hour')[0].innerHTML = hour; // 小时自动加0

        var minute = myDate.getMinutes();
        minute =(minute<10 ? "0"+minute:minute);

        var seconds = myDate.getSeconds();
        seconds =(seconds<10 ? "0"+seconds : seconds);

        document.getElementsByClassName('watch')[0].innerHTML=''+year+'-'+month+'-'+day+'  '+
            hour + ':' + minute + ':' + seconds
       
    }

    componentDidMount() {

        //const _self = this; // 指向本对象的指针

        var myDate = new Date();
        //document.getElementsByClassName('year')[0].innerHTML = myDate.getFullYear();
        var year = myDate.getFullYear()

        var month = myDate.getMonth()+1;
        month =(month<10 ? "0"+month:month);

        //document.getElementsByClassName('month')[0].innerHTML = month; // 月份自动加0

        var day = myDate.getDate();
        day =(day<10 ? "0"+day:day);

       //document.getElementsByClassName('day')[0].innerHTML = day; // 日子自动加0;

        var hour = myDate.getHours();
        hour =(hour<10 ? "0"+hour:hour);

        //document.getElementsByClassName('hour')[0].innerHTML = hour; // 小时自动加0

        var minute = myDate.getMinutes();
        minute =(minute<10 ? "0"+minute:minute);

        //document.getElementsByClassName('minute')[0].innerHTML = minute; //获取当前分钟数(0-59)

        var seconds = myDate.getSeconds();
        seconds =(seconds<10 ? "0"+seconds : seconds);

        // _self.showTimer = setInterval(()=> this.treat(), 1000); // 1分钟换一次数据
        setInterval(()=> this.treat(), 1000);
        document.getElementsByClassName('watch')[0].innerHTML=''+year+'-'+month+'-'+day+'  '+
            hour + ':' + minute + ':' + seconds
    }

    // 组件接收到新的props时调用，并将其作为参数nextProps使用
    componentWillReceiveProps(nextProps) {
        //
    }

    // 除了首次render之后调用componentDidMount
    // 其它render结束之后都是调用componentDidUpdate
    componentDidUpdate() {
        //this.setState({dataEq: this.props.data});
    }

    componentWillUnmount() {
        if(this.showTimer != null){
            window.clearTimeout(this.showTimer);
        }
    }


    render() {


        var watchStyle ={
           
            fontSize: 25,
            color: 'black',
            width: 300,
            height: 25
        }

        return (

            <div>

                {/* 整体时间 */}
                <div className={'watch'}
                     style={watchStyle}
                ></div>

            </div>


        )
    }
}