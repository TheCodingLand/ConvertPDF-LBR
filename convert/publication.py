from fpdf import FPDF
import re

class BasicPubPdf(object):
    def __init__(self,NumeroRCS,NomSociete,FormeJuridique,SiegeSocial,EnLiquidation, text):
        self.NumeroRCS = NumeroRCS
        self.NomSociete = NomSociete
        self.FormeJuridique = FormeJuridique
        self.SiegeSocial = SiegeSocial
        self.EnLiquidation = EnLiquidation
        self.texteLiquidation = "En liquidation volontaire"
        self.pdf = FPDF()

        self.pdf.set_auto_page_break(auto= True, margin=4)
        self.pdf.add_page()
        # Add a DejaVu Unicode font (uses UTF-8)
        # Supports more than 200 languages. For a coverage status see:
        # http://dejavu.svn.sourceforge.net/viewvc/dejavu/trunk/dejavu-fonts/langcover.txt
        self.pdf.add_font('Calibri', '', 'Calibri.ttf', uni=True)
        self.pdf.add_font('Calibri', 'B', 'Calibrib.ttf', uni=True)
        self.pdf.set_font('Calibri', '', 12)

        self.text=text
    def generateBody(self):

        self.text = self.text.replace('\t',' ')



        self.pdf.ln(12)

        self.pdf.ln(8)

        self.pdf.set_font('Calibri', 'B', 12)
        self.pdf.write(16,self.NomSociete)
        self.pdf.ln(6)
        self.pdf.write(16,self.FormeJuridique)
        self.pdf.ln(6)
        self.pdf.write(16,self.SiegeSocial)
        self.pdf.ln(6)
        self.pdf.write(16,self.NumeroRCS)
        self.pdf.ln(6)
        self.pdf.set_font('Calibri', '', 12)
        if self.EnLiquidation:
            self.pdf.write(16,self.texteLiquidation)

        self.pdf.ln(16)
        self.pdf.ln(16)

        for txt in self.text.split('\n'):
            txt = re.sub(r'^-','  -', txt)
            self.pdf.write(8, txt)

            self.pdf.ln(6)

    def save(self, out):

        self.pdf.output(out, 'F')


