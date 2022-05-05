<?php
include 'include.php';

/*
 {
  // Цена в рублях
  price: number
  // Код авиакомпании (iata)
  carrier: string
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: [
    {
      // Код города (iata)
      origin: string
      // Код города (iata)
      destination: string
      // Дата и время вылета туда
      date: string
      // Массив кодов (iata) городов с пересадками
      stops: string[]
      // Общее время перелёта в минутах
      duration: number
    },
    {
      // Код города (iata)
      origin: string
      // Код города (iata)
      destination: string
      // Дата и время вылета обратно
      date: string
      // Массив кодов (iata) городов с пересадками
      stops: string[]
      // Общее время перелёта в минутах
      duration: number
    }
  ]
}
 */

$iata = ["AAA","AAB","AAC","AAD","AAE","AAF","AAG","AAH","AAI","AAJ","AAK","AAL","AAM","AAN","AAO","AAP","AAQ","AAR","AAS","AAT","AAU","AAV","AAW","AAX","AAY","AAZ","ABA","ABB","ABC","ABD","ABE","ABF","ABG","ABH","ABI","ABJ","ABK","ABL","ABM","ABN","ABO","ABP","ABQ","ABR","ABS","ABT","ABU","ABV","ABW","ABX","ABY","ABZ","ACA","ACB","ACC","ACD","ACE","ACH","ACI","ACK","ACL","ACM","ACN","ACO","ACR","ACS","ACT","ACU","ACV","ACY","ACZ","ADA","ADB","ADC","ADD","ADE","ADF","ADG","ADH","ADI","ADJ","ADK","ADL","ADM","ADN","ADO","ADP","ADQ","ADR","ADS","ADT","ADU","ADV","ADW","ADX","ADY","ADZ","AEA","AED","AEG","AEH","AEK","AEL","AEO","AEP","AER","AES","AET","AEX","AEY","AFA","AFD","AFF","AFI","AFL","AFN","AFO","AFR","AFT","AFW","AFY","AGA","AGB","AGC","AGD","AGE","AGF","AGG","AGH","AGI","AGJ","AGK","AGL","AGM","AGN","AGO","AGP","AGQ","AGR","AGS","AGT","AGU","AGV","AGW","AGX","AGY","AGZ","AHB","AHC","AHD","AHE","AHF","AHH","AHI","AHL","AHN","AHO","AHS","AHT","AHU","AHY","AHZ","AIA","AIB","AIC","AID","AIE","AIF","AIG","AIH","AII","AIK","AIL","AIM","AIN","AIO","AIP","AIR","AIS","AIT","AIU","AIV","AIW","AIY","AIZ","AJA","AJF","AJI","AJJ","AJL","AJN","AJO","AJR","AJS","AJU","AJY","AKA","AKB","AKC","AKD","AKE","AKF","AKG","AKI","AKJ","AKK","AKL","AKL","AKM","AKN","AKO","AKP","AKQ","AKR","AKS","AKT","AKU","AKV","AKX","AKY","ALA","ALB","","ALC","ALD","ALE","ALF","ALG","ALH","ALI","ALJ","ALK","ALL","ALM","ALN","ALO","ALP","ALQ","ALR","ALS","ALT","ALU","ALV","ALW","ALX","ALY","ALZ","AMA","AMB","AMC","AMD","AME","AMF","AMG","AMH","AMI","AMJ","AMK","AML","AMM","AMN","AMO","AMP","AMQ","AMR","AMS","AMT","AMU","AMV","AMW","AMX","AMY","AMZ","ANA","ANB","ANB","ANC","AND","ANE","ANF","ANG","ANH","ANI","ANJ","ANK","ANL","ANM","ANN","ANO","ANP","ANQ","ANR","ANS","ANT","ANU","ANV","ANW","ANX","ANY","ANZ","AOA","AOB","AOC","AOD","AOE","AOG","AOH","AOH","AOI","AOJ","AOK","AOL","AON","AOO","AOR","AOS","AOT","AOU","APA","APB","APC","APE","APF","APG","APH","API","APK","APL","APN","APO","APP","APQ","APR","APS","APT","APU","APV","APW","APX","APY","APZ","AQA","AQB","AQG","AQI","AQJ","AQM","AQP","AQS","AQY","ARA","ARB","ARC","ARD","ARE","ARF","ARG","ARH","ARI","ARJ","ARK","ARL","ARM","ARN","ARO","ARP","ARQ","ARR","ARS","ART","ARU","ARV","ARW","ARX","ARY","ARZ","ASA","ASB","ASC","ASD","ASE","ASF","ASG","ASH","ASI","ASJ","ASK","ASL","ASM","ASN","ASO","ASP","ASQ","ASR","AST","ASU","ASV","ASW","ASX","ASY","ASZ","ATA","ATB","ATC","ATD","ATE","ATF","ATG","ATH","ATI","ATJ","ATK","ATL","ATM","ATN","ATO","ATP","ATQ","ATR","ATS","ATT","ATU","ATV","ATW","ATX","ATY","ATZ","AUA","AUC","AUD","AUE","AUF","AUG","AUH","AUI","AUJ","AUK","AUL","AUM","AUN","AUO","AUP","AUQ","AUR","AUS","AUT","AUU","AUV","AUW","AUX","AUY","AUZ","AVB","AVF","AVG","AVI","AVK","AVL","AVN","AVO","AVP","AVU","AVV","AVW","AVX","AWA","AWB","AWD","AWE","AWH","AWK","AWM","AWN","AWP","AWR","AWZ","AXA","AXB","AXC","AXD","AXE","AXG","AXK","AXL","AXM","AXN","AXP","AXR","AXS","AXT","AXU","AXV","AXX","AYA","AYC","AYD","AYE","AYG","AYI","AYK","AYL","AYN","AYO","AYP","AYQ","AYR","AYS","AYT","AYU","AYW","AYZ","AZB","AZD","AZG","AZI","AZN","AZO","AZP","AZR","AZS","AZT","AZZ"];
$carrier = ['FR', 'LO', 'AF', 'KL', 'VY', 'W6'];

function generateRandomTickets($count = 20) {
    global $iata, $carrier;

    $tickets = [];
    while ($count--) {
        $from = $iata[rand(0, count($iata) - 1)];
        $to = $iata[rand(0, count($iata) - 1)];

        $durationFrom = rand(10, 30) * 10;
        $durationTo = intval($durationFrom * (rand(8, 11) / 10));

        $int= rand(1262055681,1262055681);
        $dateFrom = date("Y-m-d H:i:s", $int);
        $dateTo = date("Y-m-d H:i:s", $int + rand(86400, 5 * 86400));




        $tickets[] = [
            'price' => rand(10, 100) * 100,
            'carrier' => $carrier[rand(1,count($carrier) - 1)],
            'segments' => [
                [
                    'origin' => $from,
                    'destination' => $to,
                    'date' => $dateFrom,
                    'stops' => array_slice($iata, 0, rand(0, 3)),
                    'duration' => $durationFrom,
                ],
                [
                    'origin' => $to,
                    'destination' => $from,
                    'date' => $dateTo,
                    'stops' => array_slice($iata, 0, rand(0, 3)),
                    'duration' => $durationTo,
                ],
            ],
        ];
    }
    return $tickets;
}

$attempt = intval($_GET['attempt']);

if ($attempt === 5) {
    header("HTTP/1.1 500 Internal Server Error");
    die();
}

echo json_encode([
    'tickets' => generateRandomTickets(),
    'stop' => $attempt >= 10,
]);
