<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class AlchemistController extends Controller
{
    public function mix(Request $request)
    {
        $weights = $request->input('weights', []);

        $essences = [
            'cemas' => ['v' => -0.4, 'a' => 0.6],
            'sedih' => ['v' => -0.6, 'a' => -0.3],
            'marah' => ['v' => -0.7, 'a' => 0.5],
            'malu' => ['v' => -0.3, 'a' => 0.2],
            'kecewa' => ['v' => -0.5, 'a' => -0.1],
            'lelah' => ['v' => -0.2, 'a' => -0.6],
        ];

        $labels = [
            ['key' => 'gelisah', 'name' => 'Gelisah', 'va' => ['v' => -0.3, 'a' => 0.6], 'definition' => 'Tidak tenang, ada ketegangan ringan.'],
            ['key' => 'sedih', 'name' => 'Sedih', 'va' => ['v' => -0.6, 'a' => -0.3], 'definition' => 'Turun perasaan, ingin menyendiri.'],
            ['key' => 'marah', 'name' => 'Marah', 'va' => ['v' => -0.7, 'a' => 0.5], 'definition' => 'Frustrasi, ingin melawan.'],
            ['key' => 'malu', 'name' => 'Malu', 'va' => ['v' => -0.3, 'a' => 0.2], 'definition' => 'Tidak nyaman dinilai orang lain.'],
            ['key' => 'kecewa', 'name' => 'Kecewa', 'va' => ['v' => -0.5, 'a' => -0.1], 'definition' => 'Ekspektasi gagal, rasa lesu.'],
            ['key' => 'lelah', 'name' => 'Lelah', 'va' => ['v' => -0.2, 'a' => -0.6], 'definition' => 'Energi rendah, butuh istirahat.'],
            ['key' => 'tenang', 'name' => 'Tenang', 'va' => ['v' => 0.4, 'a' => -0.4], 'definition' => 'Stabil, terkendali, tidak terburu-buru.'],
            ['key' => 'lega', 'name' => 'Lega', 'va' => ['v' => 0.6, 'a' => -0.2], 'definition' => 'Beban berkurang, napas lebih longgar.'],
            ['key' => 'bersemangat', 'name' => 'Bersemangat', 'va' => ['v' => 0.6, 'a' => 0.6], 'definition' => 'Antusias, energi naik.'],
            ['key' => 'damai', 'name' => 'Damai', 'va' => ['v' => 0.5, 'a' => -0.5], 'definition' => 'Rasa tenteram dan aman.'],
            ['key' => 'canggung', 'name' => 'Canggung', 'va' => ['v' => -0.1, 'a' => 0.1], 'definition' => 'Kikuk, tidak pas.'],
            ['key' => 'panik', 'name' => 'Panik', 'va' => ['v' => -0.8, 'a' => 0.8], 'definition' => 'Ketakutan tinggi dan terburu.'],
        ];

        // compute mix
        $entries = array_filter(array_map(function ($k, $w) use ($essences) {
            $w = floatval($w);
            return $w > 0 && isset($essences[$k]) ? [$k, $w] : null;
        }, array_keys($weights), array_values($weights)));

        $sum = array_reduce($entries, function ($acc, $item) {
            return $acc + ($item[1] ?? 0);
        }, 0.0);

        $v = 0.0; $a = 0.0;
        if ($sum > 0) {
            foreach ($entries as [$k, $w]) {
                $v += $essences[$k]['v'] * ($w / $sum);
                $a += $essences[$k]['a'] * ($w / $sum);
            }
        }
        $target = ['v' => round($v, 2), 'a' => round($a, 2)];

        // distance helper
        $dist = function ($l) use ($target) {
            $dv = ($l['va']['v'] ?? 0) - $target['v'];
            $da = ($l['va']['a'] ?? 0) - $target['a'];
            return sqrt($dv * $dv + $da * $da);
        };

        usort($labels, function ($x, $y) use ($dist) {
            return $dist($x) <=> $dist($y);
        });

        $top = array_slice($labels, 0, 3);

        return response()->json(['va' => $target, 'labels' => $top]);
    }

    public function finish(Request $request)
    {
        $payload = $request->only(['va', 'picked', 'weights', 'tensionBefore', 'tensionAfter']);
        // TODO: persist into DB (user_rewards, sessions). For now return ok.
        $delta = ($payload['tensionBefore'] ?? 0) - ($payload['tensionAfter'] ?? 0);
        return response()->json(['ok' => true, 'delta' => $delta]);
    }
}