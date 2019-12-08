let arry = 
[{"name":"#189112","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#189049","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#189040","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#188685","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#188604","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#188554","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#188355","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#187846","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#187702","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":3},
{"name":"#187538","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#187524","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#187192","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#187153","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#186899","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#186886","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#186719","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#186703","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#186651","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#186646","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#186144","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#186139","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#186077","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#186044","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#185753","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":2},
{"name":"#185707","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#185678","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#185523","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#184780","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#184352","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#184342","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#184090","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#183938","id":1658546126899,"title":"Wingspan (ETA 4Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#182915","id":1658546126899,"title":"Wingspan *PRE-ORDER*","unshipped":1},
{"name":"#182779","id":1658546126899,"title":"Wingspan *PRE-ORDER*","unshipped":1},
{"name":"#175156","id":1658546126899,"title":"Wingspan (ETA 3Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#175057","id":1658546126899,"title":"Wingspan (ETA 3Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#174136","id":1658546126899,"title":"Wingspan (ETA 3Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#174065","id":1658546126899,"title":"Wingspan (ETA 3Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#172052","id":1658546126899,"title":"Wingspan (ETA 3Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#172046","id":1658546126899,"title":"Wingspan (ETA 3Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#171688","id":1658546126899,"title":"Wingspan (ETA 3Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#171653","id":1658546126899,"title":"Wingspan (ETA 3Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#171185","id":1658546126899,"title":"Wingspan (ETA 3Q 2019) *PRE-ORDER*","unshipped":1},
{"name":"#167025","id":1658546126899,"title":"Wingspan *PRE-ORDER* (ETA 3Q 2019)","unshipped":1},
{"name":"#149993","id":1658546126899,"title":"Wingspan *PRE-ORDER* (ETA Mar 2019)","unshipped":1}]

testing = () => {
    let test = false
    for(i=0; i  < arry.length; i ++){
        for(j = i + 1; j <arry.length; j++){
            if(arry[i] === arry[j]){
                test = true
                console.log('repeat Order: ' + element.name)
            }
        }
    }
    console.log(test)

}

testing()