"use client";

import EstimateCost from '@/components/customer/estimateCost';
import LookUpBanner from '@/components/customer/lookUpBanner';

export default function Cost() {
    return (
        <div>
            <LookUpBanner title={"ƯỚC TÍNH CƯỚC PHÍ"} />
            <EstimateCost / >
        </div>
    );
}