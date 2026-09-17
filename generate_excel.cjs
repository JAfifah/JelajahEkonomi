const fs = require('fs');
const path = require('path');

const accounts = [
  {
    no: 1,
    username: 'admin',
    password: 'admin',
    name: 'Administrator (Penguji/Guru)',
    role: 'Admin (Tester)',
    classInfo: 'Penguji Sistem & Guru Pembina',
    initialCoins: 5000,
    initialLevel: 5,
    note: 'Akun pengujian dengan saldo koin & level tinggi untuk testing fitur'
  },
  {
    no: 2,
    username: 'user1',
    password: 'user1',
    name: 'Kelompok 1',
    role: 'Siswa',
    classInfo: 'Kelas 7A - SMP Negeri 1',
    initialCoins: 0,
    initialLevel: 1,
    note: 'Akun siswa mulai dari awal (0 koin, level 1, 0 XP, misi belum dimulai)'
  },
  {
    no: 3,
    username: 'user2',
    password: 'user2',
    name: 'Kelompok 2',
    role: 'Siswa',
    classInfo: 'Kelas 7B - SMP Negeri 1',
    initialCoins: 0,
    initialLevel: 1,
    note: 'Akun siswa mulai dari awal (0 koin, level 1, 0 XP, avatar perempuan)'
  },
  {
    no: 4,
    username: 'user3',
    password: 'user3',
    name: 'Kelompok 3',
    role: 'Siswa',
    classInfo: 'Kelas 7C - SMP Negeri 1',
    initialCoins: 0,
    initialLevel: 1,
    note: 'Akun siswa mulai dari awal (0 koin, level 1, 0 XP, misi belum dimulai)'
  },
  {
    no: 5,
    username: 'user4',
    password: 'user4',
    name: "Kelompok 4",
    role: 'Siswa',
    classInfo: 'Kelas 7A - SMP Negeri 1',
    initialCoins: 0,
    initialLevel: 1,
    note: 'Akun siswa mulai dari awal (0 koin, level 1, 0 XP, misi belum dimulai)'
  }
];

// Generate Excel SpreadsheetML XML (.xls)
const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Title>Daftar Akun Jelajah Ekonomi</Title>
  <Subject>Akun Media Pembelajaran IPS Jelajah Ekonomi</Subject>
  <Author>Jelajah Ekonomi IPS</Author>
 </DocumentProperties>
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Center"/>
   <Borders/>
   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#1E293B"/>
   <Interior/>
   <NumberFormat/>
   <Protection/>
  </Style>
  <Style ss:ID="TitleStyle">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Font ss:FontName="Calibri" ss:Size="16" ss:Bold="1" ss:Color="#0284C7"/>
  </Style>
  <Style ss:ID="SubtitleStyle">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Font ss:FontName="Calibri" ss:Size="11" ss:Italic="1" ss:Color="#64748B"/>
  </Style>
  <Style ss:ID="HeaderStyle">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2" ss:Color="#0284C7"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
   </Borders>
   <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#FFFFFF"/>
   <Interior ss:Color="#0284C7" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="AdminRow">
   <Alignment ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
   <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#BE123C"/>
   <Interior ss:Color="#FFF1F2" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="DataRow">
   <Alignment ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
   <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#1E293B"/>
  </Style>
  <Style ss:ID="CenterData">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
   <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#1E293B"/>
  </Style>
  <Style ss:ID="PasswordData">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
   <Font ss:FontName="Courier New" ss:Size="11" ss:Bold="1" ss:Color="#0369A1"/>
   <Interior ss:Color="#F0F9FF" ss:Pattern="Solid"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="Daftar Akun">
  <Table ss:ExpandedColumnCount="8" ss:DefaultRowHeight="22">
   <Column ss:Width="40"/>
   <Column ss:Width="110"/>
   <Column ss:Width="110"/>
   <Column ss:Width="180"/>
   <Column ss:Width="120"/>
   <Column ss:Width="190"/>
   <Column ss:Width="90"/>
   <Column ss:Width="300"/>

   <Row ss:Height="30">
    <Cell ss:MergeAcross="7" ss:StyleID="TitleStyle">
     <Data ss:Type="String">DAFTAR AKUN PENGGUNA - JELAJAH EKONOMI</Data>
    </Cell>
   </Row>
   <Row ss:Height="20">
    <Cell ss:MergeAcross="7" ss:StyleID="SubtitleStyle">
     <Data ss:Type="String">Catatan: Username dan Password sama persis untuk memudahkan pengujian sistem.</Data>
    </Cell>
   </Row>
   <Row ss:Index="4" ss:Height="26">
    <Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">No</Data></Cell>
    <Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">Username</Data></Cell>
    <Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">Password</Data></Cell>
    <Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">Nama Lengkap</Data></Cell>
    <Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">Peran (Role)</Data></Cell>
    <Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">Kelas / Keterangan</Data></Cell>
    <Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">Koin Awal</Data></Cell>
    <Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">Keterangan Akun</Data></Cell>
   </Row>
   ${accounts.map(acc => {
     const rowStyle = acc.role.includes('Admin') ? 'AdminRow' : 'DataRow';
     return `
   <Row ss:Height="24">
    <Cell ss:StyleID="CenterData"><Data ss:Type="Number">${acc.no}</Data></Cell>
    <Cell ss:StyleID="${rowStyle}"><Data ss:Type="String">${acc.username}</Data></Cell>
    <Cell ss:StyleID="PasswordData"><Data ss:Type="String">${acc.password}</Data></Cell>
    <Cell ss:StyleID="${rowStyle}"><Data ss:Type="String">${acc.name}</Data></Cell>
    <Cell ss:StyleID="CenterData"><Data ss:Type="String">${acc.role}</Data></Cell>
    <Cell ss:StyleID="${rowStyle}"><Data ss:Type="String">${acc.classInfo}</Data></Cell>
    <Cell ss:StyleID="CenterData"><Data ss:Type="Number">${acc.initialCoins}</Data></Cell>
    <Cell ss:StyleID="${rowStyle}"><Data ss:Type="String">${acc.note}</Data></Cell>
   </Row>`;
   }).join('')}
  </Table>
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <Selected/>
   <Panes>
    <Pane>
     <Number>3</Number>
     <ActiveRow>4</ActiveRow>
    </Pane>
   </Panes>
   <ProtectObjects>False</ProtectObjects>
   <ProtectScenarios>False</ProtectScenarios>
  </WorksheetOptions>
 </Worksheet>
</Workbook>`;

// Destination paths
const rootPath = path.resolve(__dirname, 'daftar_akun_jelajah_ekonomi.xls');
const publicPath = path.resolve(__dirname, 'public', 'daftar_akun_jelajah_ekonomi.xls');
const csvPath = path.resolve(__dirname, 'daftar_akun_jelajah_ekonomi.csv');
const publicCsvPath = path.resolve(__dirname, 'public', 'daftar_akun_jelajah_ekonomi.csv');

// Write .xls
fs.writeFileSync(rootPath, xmlContent, 'utf8');
fs.writeFileSync(publicPath, xmlContent, 'utf8');

// Also write CSV for convenience
const csvRows = [
  ['No', 'Username', 'Password', 'Nama Lengkap', 'Peran', 'Kelas / Keterangan', 'Koin Awal', 'Keterangan'],
  ...accounts.map(a => [a.no, a.username, a.password, `"${a.name}"`, a.role, `"${a.classInfo}"`, a.initialCoins, `"${a.note}"`])
];
const csvContent = '\uFEFF' + csvRows.map(r => r.join(',')).join('\n');
fs.writeFileSync(csvPath, csvContent, 'utf8');
fs.writeFileSync(publicCsvPath, csvContent, 'utf8');

console.log('Successfully generated .xls and .csv files:');
console.log('1.', rootPath);
console.log('2.', publicPath);
console.log('3.', csvPath);
console.log('4.', publicCsvPath);
