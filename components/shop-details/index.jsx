import React from 'react';
import FooterTwo from '@/layout/footers/footer-2';
import HeaderThree from '@/layout/headers/header-3';
import Breadcrumb from '../breadcrumb/breadcrumb';
import BackToTopCom from '../common/back-to-top-com';
import ShopDetailsArea from './details-area';

export default function ShopDetailsMain({product}) {
  return (
    <div className='page-wrapper'>
      <HeaderThree />
      <Breadcrumb title={'Shop Details'} subtitle={'Shop Details'} />
      <ShopDetailsArea product={product} />
      <FooterTwo />
      <BackToTopCom/>
    </div>
  )
}
