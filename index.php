<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hash Calendar</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="style.css">
    <link rel="shortcut icon" href="favicon.png" type="image/x-icon">
  </head>
  <body>
    <div class="container mt-5 pt-5">
        <div class="row">
            <div class="col-12">
                <div id="hash_calendar"></div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="hash_calendar.js?v=<?php echo time(); ?>"></script>
    <script>
        new HashCalendar("hash_calendar",{
            // shortMonthName:true,
            defaultView:"Month",
            weekWorkTime:{
                'start':9,
                'end':17,
            },
            events:{
                '2023-10-11':{
                    multiEvents:true,
                    '0':{
                        title:'Meeting With Max at 01:00 PM',
                        background:'#f0fdf5',
                        color:'#128345',
                        date:'2023-10-11',
                    },
                    '1':{
                        title:'Employees Meetup 03:00 PM',
                        background:'#fef9ec',
                        color:'#d27e2e',
                        date:'2023-10-11',
                    }
                },
                '2023-10-28':{
                    title:'Lunch with friends (01:00 PM)',
                    background:'#fef9ec',
                    color:'#d27e2e',
                    date:'2023-10-28',
                },
                '2023-10-05':{
                    title:'Lunch with friends (01:00 PM)',
                    background:'#f0fdf5',
                    color:'#128345',
                    date:'2023-10-05',
                },
                '2023-09-20':{
                    title:'Hayat Birthday (12:00 AM)',
                    background:'#f0fdf5',
                    color:'#128345',
                    date:'2023-09-20',
                },
                '2023-10-19':{
                    holyDay:true,
                },
                '2023-10-10':{
                    wholeDay:false,
                    '13':{
                        title:'Lunch at Ahmer place (01:00 PM)',
                        background:'#f0fdf5',
                        color:'#128345',
                        date:'2023-10-10',
                    },
                    '16':{
                        title:'Download Purchase Ledger (04:00 PM)',
                        background:'#fef9ec',
                        color:'#d27e2e',
                        date:'2023-10-10',
                    },
                    '10-11':{
                        title:'2 Hours Event',
                        background:'#fef9ec',
                        color:'#d27e2e',
                        date:'2023-10-13',
                    },
                },
                '2023-10-13':{
                    wholeDay:false,
                    '10':{
                        title:'Staff Meeting (09:00 AM)',
                        background:'#f0fdf5',
                        color:'#128345',
                        date:'2023-10-13',
                    },
                    '11':{
                        title:'Meeting With Client (11:00 AM)',
                        background:'#fef9ec',
                        color:'#d27e2e',
                        date:'2023-10-13',
                    },
                    '12':{
                        title:'Meeting With Client (12:00 PM)',
                        background:'#fef9ec',
                        color:'#d27e2e',
                        date:'2023-10-13',
                    },
                    '14-15-16':{
                        title:'3 Hours Event',
                        background:'#fef9ec',
                        color:'#d27e2e',
                        date:'2023-10-13',
                    },
                },
            }
        });
    </script>
  </body>
</html>